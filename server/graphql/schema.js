import { mergeSchemas } from "apollo-server-express";

// Resolvers
import { userResolver } from './user/resolvers';
import { todoResolver } from './todo/resolvers';

// TypeDefs
import { userTypeDefs } from "./user/typeDefs";
import { todoTypeDefs } from "./todo/typeDefs";

export default mergeSchemas({
  schemas: [
    userTypeDefs,
    todoTypeDefs
  ],
  resolvers: [
    userResolver,
    todoResolver
  ],
});