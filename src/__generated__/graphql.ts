/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  Timezone: { input: any; output: any; }
};

export type AdminRole = Role & {
  __typename?: 'AdminRole';
  admin: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Board = {
  __typename?: 'Board';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  tickets: Array<Ticket>;
  updatedAt: Scalars['DateTime']['output'];
};

export type BoardInput = {
  __typename?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Mutations = {
  __typename?: 'Mutations';
  createOrganisation: Organisation;
  createUser: User;
  deleteBoard: Scalars['Boolean']['output'];
  deleteTicket: Ticket;
  putBoard: Board;
  putTicket: Ticket;
  updateOrganisation: Organisation;
};


export type MutationsCreateOrganisationArgs = {
  name: Scalars['String']['input'];
  timezone: Scalars['Timezone']['input'];
};


export type MutationsCreateUserArgs = {
  user: UserInput;
};


export type MutationsDeleteBoardArgs = {
  boardId: Scalars['ID']['input'];
  organisationId: Scalars['ID']['input'];
};


export type MutationsDeleteTicketArgs = {
  organisationId: Scalars['ID']['input'];
  ticketId: Scalars['ID']['input'];
};


export type MutationsPutBoardArgs = {
  boardId?: InputMaybe<Scalars['ID']['input']>;
  input: BoardInput;
  organisationId: Scalars['ID']['input'];
};


export type MutationsPutTicketArgs = {
  boardId: Scalars['ID']['input'];
  input: TicketInput;
  organisationId: Scalars['ID']['input'];
  ticketId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationsUpdateOrganisationArgs = {
  organisationId: Scalars['ID']['input'];
  organisationInput: OrganisationInput;
};

export type Organisation = {
  __typename?: 'Organisation';
  boards: Array<Board>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  timezone: Scalars['Timezone']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type OrganisationInput = {
  __typename?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  timezone?: InputMaybe<Scalars['Timezone']['input']>;
};

export type Query = {
  __typename?: 'Query';
  board?: Maybe<Board>;
  me: User;
  members: Array<UserMembership>;
  organisation?: Maybe<Organisation>;
  roles: Array<Role>;
  ticket?: Maybe<Ticket>;
};


export type QueryBoardArgs = {
  boardId: Scalars['ID']['input'];
  organisationId: Scalars['ID']['input'];
};


export type QueryMembersArgs = {
  organisationId: Scalars['ID']['input'];
};


export type QueryOrganisationArgs = {
  organisationId: Scalars['ID']['input'];
};


export type QueryRolesArgs = {
  organisationId: Scalars['ID']['input'];
};


export type QueryTicketArgs = {
  organisationId: Scalars['ID']['input'];
  ticketId: Scalars['ID']['input'];
};

export type Role = {
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Subscriptions = {
  __typename?: 'Subscriptions';
  ticketUpdates: Ticket;
};


export type SubscriptionsTicketUpdatesArgs = {
  organisationId: Scalars['ID']['input'];
};

export type Ticket = {
  __typename?: 'Ticket';
  board: Board;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  status: TicketStatus;
  updatedAt: Scalars['DateTime']['output'];
  visible: Scalars['Boolean']['output'];
};

export type TicketInput = {
  __typename?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<TicketStatus>;
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum TicketStatus {
  Done = 'DONE',
  Inprogress = 'INPROGRESS',
  Todo = 'TODO'
}

export type User = {
  __typename?: 'User';
  cognitoId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  groups: Array<UserGroup>;
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  membership: UserMembership;
  memberships: Array<UserMembership>;
  updatedAt: Scalars['DateTime']['output'];
};

export enum UserGroup {
  Developers = 'DEVELOPERS'
}

export type UserInput = {
  __typename?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
};

export type UserMembership = {
  __typename?: 'UserMembership';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  organisation: Organisation;
  role: Role;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type UserRole = Role & {
  __typename?: 'UserRole';
  admin: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
  whitelistBoards: Array<Board>;
  write: Scalars['Boolean']['output'];
};

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, createdAt: any, updatedAt: any, memberships: Array<{ __typename?: 'UserMembership', role: { __typename: 'AdminRole', admin: boolean, id: string } | { __typename: 'UserRole', admin: boolean, write: boolean, id: string }, organisation: { __typename?: 'Organisation', id: string, name: string, timezone: any } }> } };


export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"memberships"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AdminRole"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"admin"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserRole"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"admin"}},{"kind":"Field","name":{"kind":"Name","value":"write"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"organisation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"timezone"}}]}}]}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;