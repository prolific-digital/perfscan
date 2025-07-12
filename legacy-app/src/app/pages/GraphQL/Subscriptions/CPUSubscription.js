import { gql } from "@apollo/client";

export const CPUGRAPH = gql`
  subscription Subscription($cpuGraphId: ID!) {
    cpuGraph(id: $cpuGraphId) {
      data {
        totalcpu
        syscpu
        intcpu
        batchcpu
        event_time
      }
      trend {
        peakcpu
        syscpu
        intcpu
        batchcpu
        event_month
        event_time
      }
      values {
        critical
      }
    }
  }
`;

export const numCoresGraph = gql`
  subscription Subscription($numCoresGraphId: ID!) {
    NcoresGraph(id: $numCoresGraphId) {
      data {
        totalcores
        event_time
      }
      trend {
        totalcores
        event_month
        event_time
      }
      values {
        critical
      }
    }
  }
`;