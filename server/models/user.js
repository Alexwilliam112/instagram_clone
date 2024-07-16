const { hash } = require("../utils/bcrypt");
const { getDB } = require("../config/mongo-connection");
const { ObjectId } = require("mongodb");

const userCollection = async () => {
  const userCollection = await getDB().collection("Users");
  return userCollection;
};

module.exports = (() => {
  class User {
    static async find({ username, email, id, nameOrUsername }) {
      const collection = await userCollection();
      let user;

      if (nameOrUsername) {
        const query = {
          $or: [
            { name: { $regex: nameOrUsername, $options: "i" } },
            { username: { $regex: nameOrUsername, $options: "i" } },
          ],
        };

        user = await collection
          .find(query, {
            projection: {
              password: 0,
            },
          })
          .toArray();
      } else if (id) {
        user = await collection.findOne({ _id: new ObjectId(id) });
      } else if (username) {
        user = await collection.findOne({ username });
      } else if (email) {
        user = await collection.findOne({ email });
      } else {
        user = await collection.find({}).toArray();
      }

      return user;
    }

    static async create(name, username, email, password) {
      const collection = await userCollection();

      const newUser = await collection.insertOne({
        name,
        username,
        email,
        password: hash(password),
      });

      const user = await collection.findOne(
        {
          _id: newUser.insertedId,
        },
        {
          projection: {
            password: 0,
          },
        }
      );

      return JSON.stringify(user, null, 2);
    }

    static async JoinUserAndFollow(id) {
      const collection = await userCollection();
      const user = await collection
        .aggregate([
          {
            $match: { _id: new ObjectId(id) },
          },
          {
            $lookup: {
              from: "Follows",
              localField: "_id",
              foreignField: "followingId",
              as: "followers",
            },
          },
          {
            $lookup: {
              from: "Follows",
              localField: "_id",
              foreignField: "followerId",
              as: "followings",
            },
          },
          {
            $addFields: {
              followingCount: { $size: "$followings" },
              followerCount: { $size: "$followers" },
            },
          },
          {
            $project: {
              password: 0,
            },
          },
        ])
        .toArray();

      return user[0];
    }
  }

  return User;
})();
