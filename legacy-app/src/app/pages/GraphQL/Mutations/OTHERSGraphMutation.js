import { gql } from "@apollo/client";

export const responseTime5250GraphTrigger = gql`
  mutation ResponseTimeGraphUpdate($responseTimeGraphUpdateId: ID!) {
    responseTimeGraphUpdate(id: $responseTimeGraphUpdateId) {
      data {
        response_time_5250
        event_time
      }
      trend {
        response_time_5250
        event_time
        event_month
      }
      values {
        critical
      }
    }
  }
`;

export const totalTransactionGraphTrigger = gql`
  mutation TotTransactionGraphUpdate($totTransactionGraphUpdateId: ID!) {
    totTransactionGraphUpdate(id: $totTransactionGraphUpdateId) {
      data {
        total_transactions
        event_time
      }
      trend {
        total_transactions
        event_time
        event_month
      }
      values {
        critical
      }
    }
  }
`;

export const ethernetUtilGraphTrigger = gql`
  mutation EthernetLineGraphUpdate($ethernetLineGraphUpdateId: ID!) {
    ethernetLineGraphUpdate(id: $ethernetLineGraphUpdateId) {
      data {
        total_utilization
        event_time
      }
      trend {
        total_utilization
        event_time
      }
      values {
        critical
      }
    }
  }
`;