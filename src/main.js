import { createApp, provide, h } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client/core";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./index.css";

const cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri: process.env.VUE_APP_HASURA_URL,
  headers: {
    "x-hasura-admin-secret": process.env.VUE_APP_HASURA_ADMIN_SECRET,
  },
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

const pinia = createPinia();

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App),
});
app.use(pinia);
app.mount("#app");
