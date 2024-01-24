import { GraphQLResolveInfo } from 'graphql';
import { ServerContext } from '../../server/types';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Bot = {
  __typename?: 'Bot';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  operational?: Maybe<Scalars['Boolean']['output']>;
  serviceAreaId?: Maybe<Scalars['ID']['output']>;
  supportTickets?: Maybe<Array<Maybe<SupportTicket>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  assignBotToServiceArea?: Maybe<Bot>;
  createSupportTicket?: Maybe<SupportTicket>;
  updateSupportTicketStatus?: Maybe<SupportTicket>;
};


export type MutationAssignBotToServiceAreaArgs = {
  botId: Scalars['ID']['input'];
  serviceAreaId: Scalars['ID']['input'];
};


export type MutationCreateSupportTicketArgs = {
  botId: Scalars['ID']['input'];
  issue: SupportTicketIssue;
  title: Scalars['String']['input'];
};


export type MutationUpdateSupportTicketStatusArgs = {
  id: Scalars['ID']['input'];
  status: SupportTicketStatus;
};

export type Query = {
  __typename?: 'Query';
  bot?: Maybe<Bot>;
  bots?: Maybe<Array<Maybe<Bot>>>;
  serviceArea?: Maybe<ServiceArea>;
  serviceAreas?: Maybe<Array<Maybe<ServiceArea>>>;
};


export type QueryBotArgs = {
  id: Scalars['ID']['input'];
};


export type QueryBotsArgs = {
  serviceAreaId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryServiceAreaArgs = {
  id: Scalars['ID']['input'];
};

export type ServiceArea = {
  __typename?: 'ServiceArea';
  bots?: Maybe<Array<Maybe<Bot>>>;
  countryCode: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  name: Scalars['String']['output'];
};

export type SupportTicket = {
  __typename?: 'SupportTicket';
  botId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  issue: SupportTicketIssue;
  status: SupportTicketStatus;
  title: Scalars['String']['output'];
};

export enum SupportTicketIssue {
  FlagMissing = 'FLAG_MISSING',
  LidMissing = 'LID_MISSING',
  WheelMissing = 'WHEEL_MISSING'
}

export enum SupportTicketStatus {
  Open = 'OPEN',
  Resolved = 'RESOLVED'
}

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

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



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Bot: ResolverTypeWrapper<Bot>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  ServiceArea: ResolverTypeWrapper<ServiceArea>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  SupportTicket: ResolverTypeWrapper<SupportTicket>;
  SupportTicketIssue: SupportTicketIssue;
  SupportTicketStatus: SupportTicketStatus;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  Bot: Bot;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Mutation: {};
  Query: {};
  ServiceArea: ServiceArea;
  String: Scalars['String']['output'];
  SupportTicket: SupportTicket;
}>;

export type BotResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Bot'] = ResolversParentTypes['Bot']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  operational?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  serviceAreaId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  supportTickets?: Resolver<Maybe<Array<Maybe<ResolversTypes['SupportTicket']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  assignBotToServiceArea?: Resolver<Maybe<ResolversTypes['Bot']>, ParentType, ContextType, RequireFields<MutationAssignBotToServiceAreaArgs, 'botId' | 'serviceAreaId'>>;
  createSupportTicket?: Resolver<Maybe<ResolversTypes['SupportTicket']>, ParentType, ContextType, RequireFields<MutationCreateSupportTicketArgs, 'botId' | 'issue' | 'title'>>;
  updateSupportTicketStatus?: Resolver<Maybe<ResolversTypes['SupportTicket']>, ParentType, ContextType, RequireFields<MutationUpdateSupportTicketStatusArgs, 'id' | 'status'>>;
}>;

export type QueryResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  bot?: Resolver<Maybe<ResolversTypes['Bot']>, ParentType, ContextType, RequireFields<QueryBotArgs, 'id'>>;
  bots?: Resolver<Maybe<Array<Maybe<ResolversTypes['Bot']>>>, ParentType, ContextType, Partial<QueryBotsArgs>>;
  serviceArea?: Resolver<Maybe<ResolversTypes['ServiceArea']>, ParentType, ContextType, RequireFields<QueryServiceAreaArgs, 'id'>>;
  serviceAreas?: Resolver<Maybe<Array<Maybe<ResolversTypes['ServiceArea']>>>, ParentType, ContextType>;
}>;

export type ServiceAreaResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['ServiceArea'] = ResolversParentTypes['ServiceArea']> = ResolversObject<{
  bots?: Resolver<Maybe<Array<Maybe<ResolversTypes['Bot']>>>, ParentType, ContextType>;
  countryCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SupportTicketResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['SupportTicket'] = ResolversParentTypes['SupportTicket']> = ResolversObject<{
  botId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  issue?: Resolver<ResolversTypes['SupportTicketIssue'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['SupportTicketStatus'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = ServerContext> = ResolversObject<{
  Bot?: BotResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ServiceArea?: ServiceAreaResolvers<ContextType>;
  SupportTicket?: SupportTicketResolvers<ContextType>;
}>;

