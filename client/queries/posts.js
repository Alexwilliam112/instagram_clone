import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation Mutation($input: AddPostInput) {
    AddPost(input: $input) {
      statusCode
      message
      data
    }
  }
`;

export const LIKE_POST = gql`
  mutation Mutation($input: LikePostInput) {
    LikePost(input: $input) {
      statusCode
      message
    }
  }
`;

export const COMMENT_POST = gql`
  mutation Mutation($input: CommentPostInput) {
    CommentPost(input: $input) {
      statusCode
      message
    }
  }
`;

export const GET_POST_BY_ID = gql`
  query Query($input: PostId) {
    GetPostById(input: $input) {
      statusCode
      data {
        _id
        content
        imgUrl
        authorId
        totalComments
        totalLikes
        comments {
          content
          username
          createdAt
          updatedAt
        }
        likes {
          username
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        author {
          _id
          name
          username
        }
        tags
      }
    }
  }
`;

export const GET_POST_USER_PROFILE = gql`
  query Query($input: UserId) {
    GetAllPostByUser(input: $input) {
      statusCode
      message
      data {
        _id
        content
        tags
        imgUrl
        authorId
        totalComments
        totalLikes
        comments {
          content
          username
          createdAt
          updatedAt
        }
        likes {
          username
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        author {
          _id
          name
          username
        }
      }
    }
  }
`;

export const GET_POST_BY_AUTHOR = gql`
  query Query {
    GetPostByAuthor {
      statusCode
      message
      data {
        _id
        content
        tags
        imgUrl
        authorId
        totalComments
        totalLikes
        comments {
          content
          username
          createdAt
          updatedAt
        }
        likes {
          username
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        author {
          _id
          name
          username
        }
      }
    }
  }
`;

export const GET_ALL_POSTS = gql`
  query Query {
    ShowPost {
      statusCode
      message
      data {
        _id
        content
        tags
        imgUrl
        authorId
        totalLikes
        totalComments
        comments {
          content
          username
          createdAt
          updatedAt
        }
        likes {
          username
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        author {
          _id
          name
          username
        }
      }
    }
  }
`;
