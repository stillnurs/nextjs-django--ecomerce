import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import Router from "next/router";
import React, { useState, useContext, createContext } from "react";
import { loginMutation } from "./graphql";

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = userAuthentication();

  return (
    <authContext.Provider value={auth}>
      <ApolloProvider client={auth.createApolloClient()}>
        {children}
      </ApolloProvider>
    </authContext.Provider>
  );
}

export const useAuthentication = () => {
  return useContext(authContext);
};

function userAuthentication() {
  const [authToken, setAuthToken] = useState(null);
  const [username, setUserName] = useState(null);

  const isSignedIn = () => {
    if (authToken) return true;
    return false;
  };

  function createApolloClient() {
    const link = new HttpLink({
      uri: "http://127.0.0.1:8000/graphql/",
      credentials: "include",
    });
    return new ApolloClient({
      link,
      cache: new InMemoryCache(),
    });
  }

  const signIn = async ({ username, password }) => {
    const client = createApolloClient();

    const result = await client.mutate({
      mutation: loginMutation,
      variables: { username, password },
    });
    if (result.data?.tokenAuth?.token) {
      setAuthToken(result.data.tokenAuth.token);
      setUserName(result.data.tokenAuth.payload.username);
      localStorage.setItem(
        "token",
        JSON.stringify(result.data.tokenAuth.token)
      );
      console.log(result);
      Router.push("/dashboard");
    }
  };
  return {
    signIn,
    createApolloClient,
  };
}
