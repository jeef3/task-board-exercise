import { gql } from "./__generated__/gql";

export const GET_ME = gql(`
  query me {
    me {
      id
      email
      firstName
      lastName

      createdAt
      updatedAt

      memberships {
        role {
          id
          __typename
          ... on AdminRole {
            admin
          }
          ... on UserRole {
            admin
            write
          }
        }

        organisation {
          id
          name
          timezone
        }
      }
    }
  }
`);
