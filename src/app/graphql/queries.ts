import { gql } from "@apollo/client";
import { DeepPartial } from "../types";
import { LookupResult, MakeOptional, Option, OptionsForExpiry, Stock } from "./types";

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
        }
        puts {
          strike
          last
          bid
          ask
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