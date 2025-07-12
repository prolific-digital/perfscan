import { ApolloClient, InMemoryCache, split, createHttpLink } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';

// HTTP Link for queries and mutations
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || '/api/graphql',
});

// WebSocket Link for subscriptions (only on client)
let wsLink;
if (typeof window !== 'undefined') {
  const wsClient = createClient({
    url: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3000/api/graphql-ws',
  });
  
  wsLink = new GraphQLWsLink(wsClient);
}

// Split link that routes requests to appropriate transport
const splitLink = typeof window !== 'undefined' && wsLink
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      wsLink,
      httpLink,
    )
  : httpLink;

const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          systems: {
            merge(existing = [], incoming) {
              return incoming;
            },
          },
          alerts: {
            merge(existing = [], incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'ignore',
    },
    query: {
      errorPolicy: 'all',
    },
  },
});

export default apolloClient;