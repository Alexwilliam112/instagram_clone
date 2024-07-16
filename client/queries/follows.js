import { gql } from "@apollo/client";

export const FOLLOW_QUERY = gql`
  mutation Mutation($input: FollowInput) {
    Follow(input: $input) {
      statusCode
      message
    }
  }
`;
