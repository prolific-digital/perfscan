import { gql } from "@apollo/client";

export const cpuGraphTrigger = gql`
  mutation Mutation($cpuUtilzationGraphId: ID!) {
    cpuUtilzationGraph(id: $cpuUtilzationGraphId) {
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

export const numCoresGraphTrigger = gql`
  mutation Mutation($mutationNcoresGraph: ID!) {
    mutationNcoresGraph(id: $mutationNcoresGraph) {
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