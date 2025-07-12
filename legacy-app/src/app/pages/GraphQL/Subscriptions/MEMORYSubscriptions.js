import { gql } from "@apollo/client";

export const totalFaultingGraphSub = gql`
  subscription TotFaultRateGraph($totFaultRateGraphId: ID!) {
    totFaultRateGraph(id: $totFaultRateGraphId) {
      data {
        total_faulting_rate
        event_time
        ponbr
      }
      trend {
        total_faulting_rate
        event_time
        event_month
      }
      values {
        critical
      }
    }
  }
`;