import { gql } from "@apollo/client";

export const topJobsTableTrigger = gql`
  mutation TopJobsData($topJobsDataId: ID!) {
    topJobsData(id: $topJobsDataId) {
      jbname
      jbuser
      jbnbr
      jbtype
      asyncios
      syncios
      totalios
      cpu
      faults
    }
  }
`;

export const topJobsPieChartTrigger = gql`
  mutation TopJobsPieData($topJobsPieDataId: ID!) {
    topJobsPieData(id: $topJobsPieDataId) {
      cpu {
        total
        jobname
        jobtype
      }
      faults {
        total
        jobname
        jobtype
      }
      syncios {
        total
        jobname
        jobtype
      }
      asyncios {
        total
        jobname
        jobtype
      }
      totalios {
        total
        jobname
        jobtype
      }
    }
  }
`;
