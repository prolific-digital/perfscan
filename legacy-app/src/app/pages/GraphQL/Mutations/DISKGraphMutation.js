import { gql } from "@apollo/client";

export const diskSpaceUtilGraphTrigger = gql`
  mutation DsuGraphUpdate($dsuGraphUpdateId: ID!) {
    dsuGraphUpdate(id: $dsuGraphUpdateId) {
      data {
        totalutilization
        event_time
      }
      trend {
        totalutilization
        event_month
        event_time
      }
      values {
        critical
      }
    }
  }
`;

export const diskArmUtilGraphTrigger = gql`
  mutation DauGraphUpdate($dauGraphUpdateId: ID!) {
    dauGraphUpdate(id: $dauGraphUpdateId) {
      data {
        disk_arm_utilization
        event_time
      }
      trend {
        disk_arm_utilization
        event_month
        event_time
      }
      values {
        critical
      }
    }
  }
`;

export const diskResponseTimeGraphTrigger = gql`
  mutation DrtGraphUpdate($drtGraphUpdateId: ID!) {
    drtGraphUpdate(id: $drtGraphUpdateId) {
      data {
        disk_response_time
        service_time
        wait_time
        event_time
      }
      trend {
        disk_response_time
        service_time
        wait_time
        event_month
        event_time
      }
      values {
        critical
      }
    }
  }
`;

export const diskOperationsGraphTrigger = gql`
  mutation TdoGraphUpdate($tdoGraphUpdateId: ID!) {
    tdoGraphUpdate(id: $tdoGraphUpdateId) {
      data {
        reads_per_sec
        writes_per_sec
        total_disk_ops
        event_time
      }
      trend {
        reads_per_sec
        writes_per_sec
        total_disk_ops
        event_month
        event_time
      }
      values {
        critical
      }
    }
  }
`;