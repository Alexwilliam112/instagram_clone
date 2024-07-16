const { getDB } = require('../config/mongo-connection');
const { ObjectId, MongoClient } = require('mongodb');

const postCollection = async () => {
  const collection = await getDB().collection('Posts');
  return collection;
};

module.exports = (() => {
  class Post {
    static async find({ _id, authorId }) {
      const collection = await postCollection();
      let data;

      if (_id) {
        const rawData = await collection
          .aggregate([
            {
              $match: { _id: new ObjectId(_id) },
            },
            {
              $addFields: {
                totalLikes: { $size: '$likes' },
              },
            },
            {
              $lookup: {
                from: 'Users',
                localField: 'authorId',
                foreignField: '_id',
                as: 'author',
                pipeline: [
                  {
                    $project: {
                      email: 0,
                      password: 0,
                    },
                  },
                ],
              },
            },
          ])
          .toArray();
        data = rawData[0];
      } else if (authorId) {
        data = await collection
          .aggregate([
            { $match: { authorId: new ObjectId(authorId) } },
            { $sort: { createdAt: -1 } },
            {
              $addFields: {
                totalLikes: { $size: '$likes' },
                totalComments: { $size: '$comments' },
              },
            },
            {
              $lookup: {
                from: 'Users',
                localField: 'authorId',
                foreignField: '_id',
                as: 'author',
                pipeline: [
                  {
                    $project: {
                      email: 0,
                      password: 0,
                    },
                  },
                ],
              },
            },
          ])
          .toArray();
      } else {
        data = await collection
          .aggregate([
            { $sort: { createdAt: -1 } },
            {
              $addFields: {
                totalLikes: { $size: '$likes' },
                totalComments: { $size: '$comments' },
              },
            },
            {
              $lookup: {
                from: 'Users',
                localField: 'authorId',
                foreignField: '_id',
                as: 'author',
                pipeline: [
                  {
                    $project: {
                      email: 0,
                      password: 0,
                    },
                  },
                ],
              },
            },
          ])
          .toArray();
      }

      return data;
    }

    static async create({ content, tags, imgUrl, authorId }) {
      const collection = await postCollection();

      const newPost = await collection.insertOne({
        content,
        tags,
        imgUrl,
        authorId,
        comments: [],
        likes: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return JSON.stringify(newPost, null, 2);
    }

    static async add_like({ _id, username }) {
      const collection = await postCollection();
      await collection.updateOne(
        { _id: new ObjectId(_id) },
        {
          $push: {
            likes: {
              username,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          },
        }
      );

      return;
    }

    static async add_comment({ _id, content, username }) {
      const collection = await postCollection();
      await collection.updateOne(
        { _id: new ObjectId(_id) },
        {
          $push: {
            comments: {
              username,
              content,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          },
        }
      );

      return;
    }
  }

  return Post;
})();
