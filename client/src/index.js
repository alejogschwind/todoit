import React from "react";
import ReactDOM from "react-dom";
import App from "./pages/App";
import { BrowserRouter as Router } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

import GlobalStyle from "./globalstyles";

import { InMemoryCache } from "apollo-cache-inmemory";
import { toIdValue } from "apollo-utilities";
import gql from "graphql-tag";
import { ApolloClient, HttpLink } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

const link = new HttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});

const cache = new InMemoryCache({
  dataIdFromObject: (object) => object.id,
});

const client = new ApolloClient({
  link,
  cache,
  ssrForceFetchDelay: 400,
  resolvers: {
    Mutation: {
      checkTodo: (_root, variables, { cache, getCacheKey }) => {
        const id = getCacheKey({ __typename: "Todo", id: variables.id });
        const fragment = gql`
          fragment done on Todo {
            done
          }
        `;
        const todo = cache.readFragment({ fragment, id });
        const data = { ...todo, done: !todo.done };
        cache.writeData({ id, data });
        return null;
      },
    },
  },
  // onError: ({ networkError, graphQLErrors }) => {
  //   console.log('graphQLErrors', graphQLErrors)
  //   console.log('networkError', networkError)
  // }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <GlobalStyle />
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
