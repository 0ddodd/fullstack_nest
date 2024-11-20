import { setContext } from '@apollo/client/link/context';
import createUploadLink from 'apollo-upload-client';
import { onError } from '@apollo/client/link/error';
import { InMemoryCache } from '@apollo/client/cache';
import { ApolloClient } from '@apollo/client/core';

const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    
    if (parts.length === 2) return parts.pop()?.split(";").shift()
}

// authLink
const authLink = setContext(async (_, { headers }) => {
    const token = getCookie("__session")
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
})

// websocket link

// upload link
const uploadLink = createUploadLink({
    url: "http://localhost:3000/graphql",
    header: {
        "apollo-require-preflight": "true",
    }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
        console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
    })

    if (networkError) {
        console.log(`[Network error]: ${networkError}`)
    }
    }
})

// splitlink for websockets and http

const cache = new InMemoryCache();

const client = new ApolloClient({
    link: authLink.concat(uploadLink).concat(errorLink),
    cache
})

export default client