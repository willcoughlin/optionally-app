import { CalculatorInput, LookupResult, Stock, StrategyType } from "./graphql/types";

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type SelectStrategyScreenParams = {
  underlying: LookupResult & Pick<Stock, 'bid' | 'ask' | 'last'>
};

export type SelectOptionLegsScreenParams = SelectStrategyScreenParams & {
  strategy: StrategyType
};

export type ViewResultsScreenParams = {
  calculatorInput: CalculatorInput
};

export type ThirdPartyLicenseDetailScreenParams = {
  package: any;
};

export type LicenseTextScreenParams = {
  licenseText: string;
}

export type RootStackParamList = {
  MainStackNavigator: undefined;
  EllipsisMenuStackNavigator: undefined;
};

export type MainStackParamList = {
  SelectUnderlyingScreen: undefined;
  SelectStrategyScreen: SelectStrategyScreenParams;
  SelectOptionLegsScreen: SelectOptionLegsScreenParams;
  ViewResultsScreen: ViewResultsScreenParams;
};

export type EllipsisMenuStackParamList = {
  EllipsisMenuScreen: undefined;
  NotFinancialAdviceScreen: undefined;
  LicensesScreen: undefined;
  OptionAllyLicenseScreen: undefined;
  ThirdPartyLicensesScreen: undefined;
  ThirdPartyLicenseDetailScreen: ThirdPartyLicenseDetailScreenParams;
  LicenseTextScreen: LicenseTextScreenParams;
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