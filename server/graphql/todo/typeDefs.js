import { gql } from 'apollo-server-express';

export const todoTypeDefs = gql`
  type Todo {
    _id: ID!
    text: String!
    done: Boolean!
  }

  type Query {
    todos: [Todo!]!
    todo(id: String!): Todo
  }

  type Mutation {
    createTodo(text: String!): Todo!
    checkTodo(id: String!, done: Boolean!): Todo!
    updateTodo(id: String!, text: String, done: Boolean): Todo!
    deleteTodo(id: ID!): Todo
  }

  type Subscription {
    todosChanged: Todo
  }
`