'use client';

import { ApolloProvider as ApolloClientProvider } from '@apollo/client';
import apolloClient from '@/lib/apollo-client';

export default function ApolloProvider({ children }) {
  return (
    <ApolloClientProvider client={apolloClient}>
      {children}
    </ApolloClientProvider>
  );
}