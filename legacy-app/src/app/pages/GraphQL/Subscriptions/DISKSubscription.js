import { gql } from "@apollo/client";

export const diskSpaceUtilGraphSub = gql`
  subscription Subscription($diskSpaceGraphId: ID!) {
    diskSpaceGraph(id: $diskSpaceGraphId) {
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

export const diskArmUtilGraphSub = gql`
  subscription DiskArmGraph($diskArmGraphId: ID!) {
    diskArmGraph(id: $diskArmGraphId) {
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

export const diskResponseTimeGraphSub = gql`
  subscription DiskRespTimeGraph($diskRespTimeGraphId: ID!) {
    diskRespTimeGraph(id: $diskRespTimeGraphId) {
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

export const diskOperationsGraphSub = gql`
  subscription TotDiskOpsGraph($totDiskOpsGraphId: ID!) {
    totDiskOpsGraph(id: $totDiskOpsGraphId) {
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