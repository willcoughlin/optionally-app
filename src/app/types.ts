import { StrategyType } from "./graphql/types";

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
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

export enum PositionType {
  Short = 'short',
  Long = 'long'
}

export type RootStackParamList = {
  MainStackNavigator: undefined;
  EllipsisMenuStackNavigator: undefined;
};