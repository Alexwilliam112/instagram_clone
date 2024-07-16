import { gql } from "@apollo/client";

export const LOGIN_QUERY = gql`
  mutation Mutation($input: LoginInput) {
    HandleLogin(input: $input) {
      statusCode
      access_token
      username
      userId
    }
  }
`;

export const REGISTER_QUERY = gql`
  mutation Mutation($input: UserInput) {
    CreateUser(input: $input) {
      statusCode
      message
      data
    }
  }
`;
