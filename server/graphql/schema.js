import { mergeSchemas } from "apollo-server-express";

// Resolvers
import { userResolver } from './user/resolvers';

// TypeDefs
import { userTypeDefs } from "./user/typeDefs";

export default mergeSchemas({
  schemas: [
    userTypeDefs
  ],
  resolvers: [
    userResolver
  ],
});