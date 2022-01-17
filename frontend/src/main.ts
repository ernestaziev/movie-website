import { createApp, h, provide } from "vue"
import App from "./App.vue"
import router from "./router"
import "./assets/global.css"
import "./assets/style.css"
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
} from "@apollo/client/core"
import { setContext } from "@apollo/client/link/context"
import { DefaultApolloClient } from "@vue/apollo-composable"
import { offsetLimitPagination } from "@apollo/client/utilities"
import { getToken, isAuthenticated, saveToken } from "./utils/auth"
import { TokenRefreshLink } from "apollo-link-token-refresh"

export const BACKEND_URL = "http://localhost:4000"

const httpLink = createHttpLink({
  uri: `${BACKEND_URL}/graphql`,
  credentials: "include",
})

const authLink = setContext((_, { headers }) => {
  const token = getToken()

  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  }
})

const refreshLink = new TokenRefreshLink({
  accessTokenField: "access_token",
  isTokenValidOrUndefined: () => isAuthenticated(),
  fetchAccessToken: () => {
    return fetch(`${BACKEND_URL}/refresh-token`, {
      method: "POST",
      credentials: "include",
    })
  },
  handleFetch: (accessToken) => saveToken(accessToken),
  handleError: (err) => {
    console.warn("Your refresh token is invalid. Try to relogin")
    console.error(err)
  },
})

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getMovies: offsetLimitPagination(["type", "imdb_id"]),
      },
    },
    Movie: {
      keyFields: ["imdb_id"],
    },
  },
})

const defaultClient = new ApolloClient({
  link: ApolloLink.from([refreshLink, authLink, httpLink]),
  cache,
})

createApp({
  setup() {
    provide(DefaultApolloClient, defaultClient)
  },
  render() {
    return h(App)
  },
})
  .use(router)
  .mount("#app")
