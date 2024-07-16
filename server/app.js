if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { userTypeDefs, userResolvers } = require("./schemas/user");
const { postTypeDefs, postResolvers } = require("./schemas/post");
const { followTypeDefs, followResolvers } = require("./schemas/follow");

const { connect, getDB } = require("./config/mongo-connection");
const { authentication } = require("./middlewares/authentication");

const server = new ApolloServer({
  typeDefs: [userTypeDefs, postTypeDefs, followTypeDefs],
  resolvers: [userResolvers, postResolvers, followResolvers],
  introspection: true,
  formatError: (err) => {
    console.error(err);
    return err;
  },
});

(async () => {
  await connect();
  const db = await getDB();

  const { url } = await startStandaloneServer(server, {
    listen: process.env.PORT || 4000,
    context: async ({ req, res }) => {
      return {
        auth: async () => {
          return await authentication(req);
        },
        db,
      };
    },
  });

  console.log(`Server starting at ${url}`);
})();
