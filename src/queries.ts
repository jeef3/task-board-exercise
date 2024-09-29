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
          boards {
            id
            name
          }
        }
      }
    }
  }
`);

export const GET_ORGANISATION = gql(`
  query organisation($organisationId: ID!) {
    organisation(organisationId: $organisationId) {
      id
      name
      timezone
      createdAt
      updatedAt

      boards {
        id
        name

        tickets {
          id
          name
          description
          status
        }
      }
    }
  }
`);

export const PUT_BOARD = gql(`
  mutation putBoard($organisationId: ID!, $boardId: ID, $input: BoardInput!) {
    putBoard(organisationId: $organisationId, boardId: $boardId, input: $input) {
      id
      name

      createdAt
      updatedAt
      tickets {
        name
        description
        status
      }
    }
  }
`);

export const PUT_TICKET = gql(`
  mutation putTicket($organisationId: ID!, $boardId: ID!, $ticketId: ID $input: TicketInput!) {
    putTicket(organisationId: $organisationId, boardId: $boardId, ticketId: $ticketId, input: $input) {
      id
      name
      description
      status
      visible
    }
  }
`);
