import { gql } from "@apollo/client";

export const responseTime5250GraphSub = gql`
  subscription ResponseTimeGraph($responseTimeGraphId: ID!) {
    responseTimeGraph(id: $responseTimeGraphId) {
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

export const totalTransactionGraphSub = gql`
  subscription TotTransactionGraph($totTransactionGraphId: ID!) {
    totTransactionGraph(id: $totTransactionGraphId) {
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

export const ethernetUtilGraphSub = gql`
  subscription EthernetLineGraph($ethernetLineGraphId: ID!) {
    ethernetLineGraph(id: $ethernetLineGraphId) {
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