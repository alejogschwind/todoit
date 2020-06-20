import React from "react";
import ReactDOM from "react-dom";
import App from "./pages/App";
import { BrowserRouter as Router } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

import GlobalStyle from "./globalstyles";

import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

const link = new HttpLink({ uri: "http://localhost:4000/graphql", credentials: 'include' });

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
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
