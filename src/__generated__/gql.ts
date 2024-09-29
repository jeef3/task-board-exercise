/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query me {\n    me {\n      id\n      email\n      firstName\n      lastName\n\n      createdAt\n      updatedAt\n\n      memberships {\n        role {\n          id\n          __typename\n          ... on AdminRole {\n            admin\n          }\n          ... on UserRole {\n            admin\n            write\n          }\n        }\n\n        organisation {\n          id\n          name\n          timezone\n          boards {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n": types.MeDocument,
    "\n  query organisation($organisationId: ID!) {\n    organisation(organisationId: $organisationId) {\n      id\n      name\n      timezone\n      createdAt\n      updatedAt\n\n      boards {\n        id\n        name\n\n        tickets {\n          id\n          name\n          description\n          status\n          visible\n        }\n      }\n    }\n  }\n": types.OrganisationDocument,
    "\n  mutation putBoard($organisationId: ID!, $boardId: ID, $input: BoardInput!) {\n    putBoard(organisationId: $organisationId, boardId: $boardId, input: $input) {\n      id\n      name\n\n      createdAt\n      updatedAt\n      tickets {\n        name\n        description\n        status\n        visible\n      }\n    }\n  }\n": types.PutBoardDocument,
    "\n  mutation putTicket($organisationId: ID!, $boardId: ID!, $ticketId: ID $input: TicketInput!) {\n    putTicket(organisationId: $organisationId, boardId: $boardId, ticketId: $ticketId, input: $input) {\n      id\n      name\n      description\n      status\n      visible\n    }\n  }\n": types.PutTicketDocument,
    "\n  mutation deleteTicket($organisationId: ID!, $ticketId: ID!) {\n    deleteTicket(organisationId: $organisationId, ticketId: $ticketId) {\n      id\n      name\n      description\n      status\n      visible\n    }\n  }\n": types.DeleteTicketDocument,
    "\n  subscription ticketUpdates($organisationId: ID!) {\n    ticketUpdates(organisationId: $organisationId) {\n      name\n      id\n    }\n  }\n": types.TicketUpdatesDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query me {\n    me {\n      id\n      email\n      firstName\n      lastName\n\n      createdAt\n      updatedAt\n\n      memberships {\n        role {\n          id\n          __typename\n          ... on AdminRole {\n            admin\n          }\n          ... on UserRole {\n            admin\n            write\n          }\n        }\n\n        organisation {\n          id\n          name\n          timezone\n          boards {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query me {\n    me {\n      id\n      email\n      firstName\n      lastName\n\n      createdAt\n      updatedAt\n\n      memberships {\n        role {\n          id\n          __typename\n          ... on AdminRole {\n            admin\n          }\n          ... on UserRole {\n            admin\n            write\n          }\n        }\n\n        organisation {\n          id\n          name\n          timezone\n          boards {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query organisation($organisationId: ID!) {\n    organisation(organisationId: $organisationId) {\n      id\n      name\n      timezone\n      createdAt\n      updatedAt\n\n      boards {\n        id\n        name\n\n        tickets {\n          id\n          name\n          description\n          status\n          visible\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query organisation($organisationId: ID!) {\n    organisation(organisationId: $organisationId) {\n      id\n      name\n      timezone\n      createdAt\n      updatedAt\n\n      boards {\n        id\n        name\n\n        tickets {\n          id\n          name\n          description\n          status\n          visible\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation putBoard($organisationId: ID!, $boardId: ID, $input: BoardInput!) {\n    putBoard(organisationId: $organisationId, boardId: $boardId, input: $input) {\n      id\n      name\n\n      createdAt\n      updatedAt\n      tickets {\n        name\n        description\n        status\n        visible\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation putBoard($organisationId: ID!, $boardId: ID, $input: BoardInput!) {\n    putBoard(organisationId: $organisationId, boardId: $boardId, input: $input) {\n      id\n      name\n\n      createdAt\n      updatedAt\n      tickets {\n        name\n        description\n        status\n        visible\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation putTicket($organisationId: ID!, $boardId: ID!, $ticketId: ID $input: TicketInput!) {\n    putTicket(organisationId: $organisationId, boardId: $boardId, ticketId: $ticketId, input: $input) {\n      id\n      name\n      description\n      status\n      visible\n    }\n  }\n"): (typeof documents)["\n  mutation putTicket($organisationId: ID!, $boardId: ID!, $ticketId: ID $input: TicketInput!) {\n    putTicket(organisationId: $organisationId, boardId: $boardId, ticketId: $ticketId, input: $input) {\n      id\n      name\n      description\n      status\n      visible\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation deleteTicket($organisationId: ID!, $ticketId: ID!) {\n    deleteTicket(organisationId: $organisationId, ticketId: $ticketId) {\n      id\n      name\n      description\n      status\n      visible\n    }\n  }\n"): (typeof documents)["\n  mutation deleteTicket($organisationId: ID!, $ticketId: ID!) {\n    deleteTicket(organisationId: $organisationId, ticketId: $ticketId) {\n      id\n      name\n      description\n      status\n      visible\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription ticketUpdates($organisationId: ID!) {\n    ticketUpdates(organisationId: $organisationId) {\n      name\n      id\n    }\n  }\n"): (typeof documents)["\n  subscription ticketUpdates($organisationId: ID!) {\n    ticketUpdates(organisationId: $organisationId) {\n      name\n      id\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;