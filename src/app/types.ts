import { LookupResult, Stock, StrategyType } from "./graphql/types";

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type SelectStrategyScreenParams = {
  underlying: LookupResult & Pick<Stock, 'bid' | 'ask' | 'last'>
};

export type SelectOptionLegsScreenParams = SelectStrategyScreenParams & {
  strategy: StrategyType
};

export type StackParamList = {
  SelectUnderlyingScreen: undefined;
  SelectStrategyScreen: SelectStrategyScreenParams;
  SelectOptionLegsScreen: SelectOptionLegsScreenParams;
};

export const STRATEGY_DISPLAY_NAMES: { [id in StrategyType]: string } = {
  CALL: 'Call',
  PUT: 'Put',
  STRADDLE_STRANGLE: 'Straddle/Strangle',
  BULL_CALL_SPREAD: 'Bull Call Spread',
  BEAR_CALL_SPREAD: 'Bear Call Spread',
  BEAR_PUT_SPREAD: 'Bear Put Spread',
  BULL_PUT_SPREAD: 'Bull Put Spread',
  IRON_CONDOR: 'Iron Condor'
};