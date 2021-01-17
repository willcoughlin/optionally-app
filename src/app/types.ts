import { CalculatorInput, CalculatorResult, Stock, StrategyType } from "./graphql/types";

export interface AppState {
  error?: string,
  isLoading: boolean,
  loadingMessage?: string,
  selectedStock?: Stock,
  calculatorInput?: CalculatorInput
  calculatorResult?: CalculatorResult
};

export type StackParamList = {
  SelectUnderlyingScreen: undefined;
  SelectStrategyScreen: undefined;
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