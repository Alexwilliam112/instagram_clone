const { GraphQLError } = require("graphql");
const { verifyToken } = require("../utils/jwt");
const User = require('../models/user')

module.exports = {
    authentication: async (req) => {
        const authorization = req.headers.authorization;

        if (!authorization) {
            throw new GraphQLError("Unauthorized. Please Log In", {
                extensions: {
                    http: {
                        status: 401,
                    },
                },
            });
        }

        const token = authorization.split(" ")[1];

        if (!token) {
            throw new GraphQLError("Unauthorized. Please Log In", {
                extensions: {
                    http: {
                        status: 401,
                    },
                },
            });
        }

        const payload = verifyToken(token);
        const user = await User.find({ id: payload.id });

        delete user.password;
        return user;
    }
}
