const { GraphQLError } = require("graphql");
const { DateTimeResolver, JSONResolver } = require("graphql-scalars");
const Post = require("../models/post");
const Validation = require("../utils/validation");
const redis = require("../config/redis");

module.exports = {
  postTypeDefs: `#graphql
        scalar DateTime

        input AddPostInput {
            content: String!
            tags: [String]
            imgUrl: String
        }

        input LikePostInput {
            _id: ID!
        }

        input CommentPostInput {
            _id: ID!
            content: String
        }

        input PostId {
            PostId: ID
        }

        input UserId {
            UserId: ID
        }

        type Comment {
            content: String!
            username: String!
            createdAt: DateTime
            updatedAt: DateTime
        }

        type Like {
            username: String!
            createdAt: DateTime
            updatedAt: DateTime
        }
    
        type Post {
            _id: ID!
            content: String!
            tags: [String]
            imgUrl: String
            authorId: ID
            totalComments: Int,
            totalLikes: Int
            comments: [Comment]
            likes: [Like]
            createdAt: DateTime
            updatedAt: DateTime
            author: [UserInfo]
        }

        type AddPostResponse {
            statusCode: Int
            message: String
            data: JSON
        }

        type ShowPostResponse {
            statusCode: Int
            message: String
            data: [Post]
        }

        type UpdateResponse {
            statusCode: Int
            message: String
        }

        type PostByIdResponse {
            statusCode: Int
            data: Post
        }

        type Query {
            ShowPost: ShowPostResponse
            GetPostById(input: PostId): PostByIdResponse
            GetPostByAuthor: ShowPostResponse
            GetAllPostByUser(input: UserId): ShowPostResponse
        }

        type Mutation {
            AddPost(input: AddPostInput): AddPostResponse
            LikePost(input: LikePostInput): UpdateResponse
            CommentPost(input: CommentPostInput): UpdateResponse
        }
    `,

  postResolvers: {
    DateTime: DateTimeResolver,
    JSON: JSONResolver,

    Query: {
      ShowPost: async (_, __, context) => {
        await context.auth();

        const cache_posts = await redis.get("data:posts");
        if (cache_posts) {
          return {
            statusCode: 200,
            message: `Success read all posts`,
            data: JSON.parse(cache_posts),
          };
        }

        const data = await Post.find({});
        await redis.set("data:posts", JSON.stringify(data));

        return {
          statusCode: 200,
          message: `Success read all posts`,
          data,
        };
      },

      GetPostByAuthor: async (_, __, context) => {
        const user = await context.auth();
        let data = await Post.find({ authorId: user._id });

        if (!data) data = [];
        return {
          statusCode: 200,
          message: `Success read all post from user ${user.username}`,
          data,
        };
      },

      GetAllPostByUser: async (_, args, context) => {
        await context.auth();
        const userId = args.input.UserId
        let data = await Post.find({ authorId: userId });

        if (!data) data = [];
        return {
          statusCode: 200,
          message: `Success read all post from user ${userId}`,
          data,
        };
      },

      GetPostById: async (_, args, context) => {
        await context.auth();
        const { input } = args;
        const { PostId } = input;
        Validation.notEmpty(PostId, "PostId");

        const data = await Post.find({ _id: PostId });
        if (!data) {
          throw new GraphQLError(`Post not found`, {
            extensions: {
              http: {
                status: 404,
              },
            },
          });
        }

        return {
          statusCode: 200,
          data,
        };
      },
    },

    Mutation: {
      AddPost: async (_, args, context) => {
        const { input } = args;
        const { content, tags, imgUrl } = input;
        const loginInfo = await context.auth();
        const authorId = loginInfo._id;

        Validation.notEmpty(content, "content");

        const data = await Post.create({ content, tags, imgUrl, authorId });
        await redis.del("data:posts");
        return {
          statusCode: 201,
          message: `Success create post`,
          data,
        };
      },

      LikePost: async (_, args, context) => {
        const { input } = args;
        const { _id } = input;
        const loginInfo = await context.auth();
        const username = loginInfo.username;

        const post = await Post.find({ _id });
        if (!post) {
          throw new GraphQLError(`Post not found`, {
            extensions: {
              http: {
                status: 404,
              },
            },
          });
        }

        await Post.add_like({ _id, username });
        await redis.del("data:posts");
        return {
          statusCode: 201,
          message: `Successfully added Like to Post`,
        };
      },

      CommentPost: async (_, args, context) => {
        const { input } = args;
        const { _id, content } = input;
        const loginInfo = await context.auth();
        const username = loginInfo.username;

        Validation.notEmpty(content, "Comment content");

        const post = await Post.find({ _id });
        if (!post) {
          throw new GraphQLError(`Post not found`, {
            extensions: {
              http: {
                status: 404,
              },
            },
          });
        }

        await Post.add_comment({ _id, content, username });
        await redis.del("data:posts");
        return {
          statusCode: 201,
          message: `Comment sent`,
        };
      },
    },
  },
};
