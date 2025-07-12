import { gql } from "@apollo/client";

export const METRICSDATASub = gql`
  subscription MetricsUpdates($metricsUpdatesId: ID!) {
    metricsUpdates(id: $metricsUpdatesId) {
      peak
      event_time
      dtypedesc
      dtype
      warning
      critical
      sysid
    }
  }
`;
