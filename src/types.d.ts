import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;


/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> = {
  Role: ( AdminRole ) | ( UserRole );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AdminRole: ResolverTypeWrapper<AdminRole>;
  Board: ResolverTypeWrapper<Board>;
  BoardInput: BoardInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Mutations: ResolverTypeWrapper<{}>;
  Organisation: ResolverTypeWrapper<Organisation>;
  OrganisationInput: OrganisationInput;
  Query: ResolverTypeWrapper<{}>;
  Role: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Role']>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscriptions: ResolverTypeWrapper<{}>;
  Ticket: ResolverTypeWrapper<Ticket>;
  TicketInput: TicketInput;
  TicketStatus: TicketStatus;
  Timezone: ResolverTypeWrapper<Scalars['Timezone']['output']>;
  User: ResolverTypeWrapper<Omit<User, 'membership' | 'memberships'> & { membership: ResolversTypes['UserMembership'], memberships: Array<ResolversTypes['UserMembership']> }>;
  UserGroup: UserGroup;
  UserInput: UserInput;
  UserMembership: ResolverTypeWrapper<Omit<UserMembership, 'organisation' | 'role' | 'user'> & { organisation: ResolversTypes['Organisation'], role: ResolversTypes['Role'], user: ResolversTypes['User'] }>;
  UserRole: ResolverTypeWrapper<UserRole>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AdminRole: AdminRole;
  Board: Board;
  BoardInput: BoardInput;
  Boolean: Scalars['Boolean']['output'];
  DateTime: Scalars['DateTime']['output'];
  ID: Scalars['ID']['output'];
  Mutations: {};
  Organisation: Organisation;
  OrganisationInput: OrganisationInput;
  Query: {};
  Role: ResolversInterfaceTypes<ResolversParentTypes>['Role'];
  String: Scalars['String']['output'];
  Subscriptions: {};
  Ticket: Ticket;
  TicketInput: TicketInput;
  Timezone: Scalars['Timezone']['output'];
  User: Omit<User, 'membership' | 'memberships'> & { membership: ResolversParentTypes['UserMembership'], memberships: Array<ResolversParentTypes['UserMembership']> };
  UserInput: UserInput;
  UserMembership: Omit<UserMembership, 'organisation' | 'role' | 'user'> & { organisation: ResolversParentTypes['Organisation'], role: ResolversParentTypes['Role'], user: ResolversParentTypes['User'] };
  UserRole: UserRole;
};

export type AuthorizationDirectiveArgs = { };

export type AuthorizationDirectiveResolver<Result, Parent, ContextType = any, Args = AuthorizationDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AdminRoleResolvers<ContextType = any, ParentType extends ResolversParentTypes['AdminRole'] = ResolversParentTypes['AdminRole']> = {
  admin?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BoardResolvers<ContextType = any, ParentType extends ResolversParentTypes['Board'] = ResolversParentTypes['Board']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tickets?: Resolver<Array<ResolversTypes['Ticket']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type MutationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutations'] = ResolversParentTypes['Mutations']> = {
  createOrganisation?: Resolver<ResolversTypes['Organisation'], ParentType, ContextType, RequireFields<MutationsCreateOrganisationArgs, 'name' | 'timezone'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationsCreateUserArgs, 'user'>>;
  deleteBoard?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationsDeleteBoardArgs, 'boardId' | 'organisationId'>>;
  deleteTicket?: Resolver<ResolversTypes['Ticket'], ParentType, ContextType, RequireFields<MutationsDeleteTicketArgs, 'organisationId' | 'ticketId'>>;
  putBoard?: Resolver<ResolversTypes['Board'], ParentType, ContextType, RequireFields<MutationsPutBoardArgs, 'input' | 'organisationId'>>;
  putTicket?: Resolver<ResolversTypes['Ticket'], ParentType, ContextType, RequireFields<MutationsPutTicketArgs, 'boardId' | 'input' | 'organisationId'>>;
  updateOrganisation?: Resolver<ResolversTypes['Organisation'], ParentType, ContextType, RequireFields<MutationsUpdateOrganisationArgs, 'organisationId' | 'organisationInput'>>;
};

export type OrganisationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Organisation'] = ResolversParentTypes['Organisation']> = {
  boards?: Resolver<Array<ResolversTypes['Board']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timezone?: Resolver<ResolversTypes['Timezone'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  board?: Resolver<Maybe<ResolversTypes['Board']>, ParentType, ContextType, RequireFields<QueryBoardArgs, 'boardId' | 'organisationId'>>;
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  members?: Resolver<Array<ResolversTypes['UserMembership']>, ParentType, ContextType, RequireFields<QueryMembersArgs, 'organisationId'>>;
  organisation?: Resolver<Maybe<ResolversTypes['Organisation']>, ParentType, ContextType, RequireFields<QueryOrganisationArgs, 'organisationId'>>;
  roles?: Resolver<Array<ResolversTypes['Role']>, ParentType, ContextType, RequireFields<QueryRolesArgs, 'organisationId'>>;
  ticket?: Resolver<Maybe<ResolversTypes['Ticket']>, ParentType, ContextType, RequireFields<QueryTicketArgs, 'organisationId' | 'ticketId'>>;
};

export type RoleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Role'] = ResolversParentTypes['Role']> = {
  __resolveType: TypeResolveFn<'AdminRole' | 'UserRole', ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
};

export type SubscriptionsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscriptions'] = ResolversParentTypes['Subscriptions']> = {
  ticketUpdates?: SubscriptionResolver<ResolversTypes['Ticket'], "ticketUpdates", ParentType, ContextType, RequireFields<SubscriptionsTicketUpdatesArgs, 'organisationId'>>;
};

export type TicketResolvers<ContextType = any, ParentType extends ResolversParentTypes['Ticket'] = ResolversParentTypes['Ticket']> = {
  board?: Resolver<ResolversTypes['Board'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['TicketStatus'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  visible?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface TimezoneScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timezone'], any> {
  name: 'Timezone';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  cognitoId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  groups?: Resolver<Array<ResolversTypes['UserGroup']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  membership?: Resolver<ResolversTypes['UserMembership'], ParentType, ContextType>;
  memberships?: Resolver<Array<ResolversTypes['UserMembership']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserMembershipResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserMembership'] = ResolversParentTypes['UserMembership']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  organisation?: Resolver<ResolversTypes['Organisation'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Role'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserRoleResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserRole'] = ResolversParentTypes['UserRole']> = {
  admin?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  whitelistBoards?: Resolver<Array<ResolversTypes['Board']>, ParentType, ContextType>;
  write?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AdminRole?: AdminRoleResolvers<ContextType>;
  Board?: BoardResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Mutations?: MutationsResolvers<ContextType>;
  Organisation?: OrganisationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Role?: RoleResolvers<ContextType>;
  Subscriptions?: SubscriptionsResolvers<ContextType>;
  Ticket?: TicketResolvers<ContextType>;
  Timezone?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UserMembership?: UserMembershipResolvers<ContextType>;
  UserRole?: UserRoleResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  authorization?: AuthorizationDirectiveResolver<any, any, ContextType>;
};
