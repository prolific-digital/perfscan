import { gql } from "@apollo/client";

export const topJobsTableSub = gql`
  subscription TopJobsData($topJobsDataId: ID!) {
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

export const topJobsPieChartSub = gql`
  subscription TopJobsPieData($topJobsPieDataId: ID!) {
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