import { gql } from "@apollo/client";

export const GET_CURRENT_USER = gql`
  query Query {
    GetCurrentUser {
      statusCode
      data {
        _id
        name
        username
        email
        followingCount
        followerCount
      }
    }
  }
`;

export const GET_USER_PROFILE = gql`
  query Query($input: UserIdInput) {
    GetUserById(input: $input) {
      statusCode
      data {
        _id
        name
        username
        email
        followingCount
        followerCount
        followers {
          _id
          followingId
          followerId
          createdAt
          updatedAt
        }
        followings {
          _id
          followingId
          followerId
          createdAt
          updatedAt
        }
      }
    }
  }
`;

export const FIND_USERS = gql`
  query Query($input: nameOrUsername) {
    FindUser(input: $input) {
      statusCode
      data {
        _id
        name
        username
        email
      }
    }
  }
`;

export const GET_ALL_USERS = gql`
  query Query {
    GetAllUser {
      statusCode
      data {
        _id
        name
        username
        email
      }
    }
  }
`;
