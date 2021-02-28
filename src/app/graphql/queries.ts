import { gql } from "@apollo/client";
import { DeepPartial } from "../types";
import { CalculatorResult, LookupResult, OptionsForExpiry, Stock } from "./types";

export const LOOKUP_QUERY = gql`
  query LookupQuery($query: String!) {
    lookup(query: $query) {
      symbol
      name
      exchange
    }
  }
`;

export type LookupQueryData = {
  lookup: LookupResult[];
};

export const UNDERLYING_PRICE_QUERY = gql`
  query UnderlyingPriceQuery($symbol: String!) {
    stock(symbol: $symbol) {
      bid
      ask
      last
    }
  }
`;

export type UnderlyingPriceQueryData = {
  stock: Pick<Stock, 'bid' | 'ask' | 'last'>;
}

export const OPTIONS_CHAIN_QUERY = gql`
  query OptionsChainQuery($symbol: String!) {
    stock(symbol: $symbol) {
      optionsChain {
        expiry
        calls {
          strike
          last
          bid
          ask
          underlyingPrice
          impliedVolatility
          type
        }
        puts {
          strike
          last
          bid
          ask
          underlyingPrice
          impliedVolatility
          type
        }
      }
    }
  }
`;

export type PartialOptionsForExpiry = DeepPartial<OptionsForExpiry> & Pick<OptionsForExpiry, 'expiry'>;

export type OptionsChainQueryData = {
  stock: {
    optionsChain: PartialOptionsForExpiry[];
  }
};

export const CALCULATE_RETURNS_QUERY = gql`
  query CalculateReturnsQuery($input: CalculatorInput!) {
    calculateReturns(input: $input) {
      entryCost
      maxRisk
      maxReturn
      breakEvenAtExpiry
      returnsTable
    }
  }
`;

export type CalculateReturnsQueryData = {
  calculateReturns: CalculatorResult;
};