import { gql } from "@apollo/client";

export const LOAD_USERS = gql`
  query ExampleQuery {
    currentNumber
    hello
  }

  subscription Subscription {
    numberIncremented
  }
`;

export const SYSTEM_STATUS_SUBSCRIPTION = gql`
  subscription Subscription {
    systemStatus {
      id
      entity_name
      entity_description
      serial_number
      system_type
      type
      msg
    }
  }
`;