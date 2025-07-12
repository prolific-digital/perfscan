import { gql } from "@apollo/client";

export const METRICS_UPDATED_DATA = gql`
  mutation MetricsUpdate($metricsUpdateId: ID!) {
  metricsUpdate(id: $metricsUpdateId) {
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

export const ON_DISCONNECT = gql`
  mutation Disconnect {
    disconnect
  }
`;