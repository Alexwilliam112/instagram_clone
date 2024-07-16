const { getDB } = require("../config/mongo-connection");
const { ObjectId } = require("mongodb");

const followCollection = async () => {
  const collection = await getDB().collection("Follows");
  return collection;
};

module.exports = (() => {
  class Follow {
    static async create({ followingId, followerId }) {
      const collection = await followCollection();

      await collection.insertOne({
        followerId,
        followingId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return;
    }
  }

  return Follow;
})();
