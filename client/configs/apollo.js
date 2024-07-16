import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import * as SecureStore from "expo-secure-store";
import { useContext } from "react";
import { ErrorContext } from "../contexts/errorContext";

import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

if (__DEV__) {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

const httpLink = createHttpLink({
  uri: "https://insta.alexanderwil.com/",
});

const authLink = setContext(async (_, { headers }) => {
  const token = await SecureStore.getItemAsync("token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// const errorLink = onError(({ graphQLErrors, networkError }) => {
//   const { setErrorMessage } = useContext(ErrorContext);

//   if (graphQLErrors) {
//     graphQLErrors.forEach(({ message }) => {
//       console.error(`ErrorMessage: ${message}`);
//       setErrorMessage(message);
//     });
//   }

//   if (networkError) {
//     console.error(`[Network error]: ${networkError}`);
//     setErrorMessage(networkError.message);
//   }
// });

const client = new ApolloClient({
  // link: errorLink.concat(authLink.concat(httpLink)),
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
