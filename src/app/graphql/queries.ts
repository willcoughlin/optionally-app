import { gql } from "@apollo/client";
import { LookupResult, Stock } from "./types";

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