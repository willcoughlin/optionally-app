import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Tradable = {
  bid: Scalars['Float'];
  ask: Scalars['Float'];
  last: Scalars['Float'];
};

export type Stock = Tradable & {
  __typename?: 'Stock';
  bid: Scalars['Float'];
  ask: Scalars['Float'];
  last: Scalars['Float'];
  symbol: Scalars['String'];
  optionsChain: Array<OptionsForExpiry>;
};

export type Option = Tradable & {
  __typename?: 'Option';
  bid: Scalars['Float'];
  ask: Scalars['Float'];
  last: Scalars['Float'];
  strike: Scalars['Float'];
  expiry: Scalars['String'];
  type: OptionType;
  underlyingSymbol: Scalars['String'];
  underlyingPrice: Scalars['Float'];
  impliedVolatility: Scalars['Float'];
};

export type OptionsForExpiry = {
  __typename?: 'OptionsForExpiry';
  expiry: Scalars['String'];
  calls: Array<Option>;
  puts: Array<Option>;
};

export type CalculatorResult = {
  __typename?: 'CalculatorResult';
  entryCost: Scalars['Float'];
  maxRisk?: Maybe<Scalars['Float']>;
  maxReturn?: Maybe<Scalars['Float']>;
  breakEvenAtExpiry: Array<Scalars['Float']>;
  returnsTable: ReturnsTable;
};

export type ReturnsTable = {
  __typename?: 'ReturnsTable';
  dates: Array<Scalars['String']>;
  underlyingPrices: Array<Scalars['Float']>;
  dataMatrix: Array<Array<Scalars['Float']>>;
};

export type LookupResult = {
  __typename?: 'LookupResult';
  symbol: Scalars['String'];
  name: Scalars['String'];
  exchange: Scalars['String'];
};

export enum OptionType {
  Call = 'CALL',
  Put = 'PUT'
}

export enum StrategyType {
  Call = 'CALL',
  Put = 'PUT',
  StraddleStrangle = 'STRADDLE_STRANGLE',
  BullCallSpread = 'BULL_CALL_SPREAD',
  BearCallSpread = 'BEAR_CALL_SPREAD',
  BullPutSpread = 'BULL_PUT_SPREAD',
  BearPutSpread = 'BEAR_PUT_SPREAD',
  IronCondor = 'IRON_CONDOR'
}

export type CalculatorInput = {
  strategy: StrategyType;
  longCall?: Maybe<OptionInput>;
  longPut?: Maybe<OptionInput>;
  shortCall?: Maybe<OptionInput>;
  shortPut?: Maybe<OptionInput>;
};

export type OptionInput = {
  quantity: Scalars['Int'];
  currentPrice: Scalars['Float'];
  strike: Scalars['Float'];
  expiry: Scalars['String'];
  underlyingPrice: Scalars['Float'];
  impliedVolatility: Scalars['Float'];
  type: OptionType;
};

export type Query = {
  __typename?: 'Query';
  lookup: Array<Maybe<LookupResult>>;
  stock: Stock;
  calculateReturns: CalculatorResult;
};


export type QueryLookupArgs = {
  query: Scalars['String'];
};


export type QueryStockArgs = {
  symbol: Scalars['String'];
};


export type QueryCalculateReturnsArgs = {
  input: CalculatorInput;
};
