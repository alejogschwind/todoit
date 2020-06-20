import { gql } from "apollo-server-express";

export const userTypeDefs = gql`
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
  }

  input RegisterUserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  type Query {
    userIsLogin: User
  }

  type Mutation {
    loginUser(email: String!, password: String!): User!
    registerUser(user: RegisterUserInput!): User!
    logoutUser: Boolean!
    verifyEmail(token: String!): Boolean!
    changePassword(
      password: String!
      confirmPassword: String!
      newPassword: String!
    ): Boolean!
    sendPasswordReset(email: String!): Boolean!
    resetPassword(
      token: String!
      newPassword: String!
      confirmPassword: String!
    ): Boolean!
  }
`;