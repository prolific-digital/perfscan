import { gql } from "@apollo/client";

export const totalFaultingGraphTrigger = gql`
  mutation TfrGraphUpdate($tfrGraphUpdateId: ID!) {
    tfrGraphUpdate(id: $tfrGraphUpdateId) {
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