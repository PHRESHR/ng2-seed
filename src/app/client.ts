// Polyfill fetch
import 'isomorphic-fetch';
import ApolloClient, { createNetworkInterface } from 'apollo-client';

const networkInterface = createNetworkInterface('http://localhost:8888/graphql');

export const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: r => r['id'],
});
