import { CalculatorInput, LookupResult, Stock, StrategyType } from "../../graphql/types";

export type MainStackParamList = {
  SelectUnderlyingScreen: undefined;
  SelectStrategyScreen: SelectStrategyScreenParams;
  SelectOptionLegsScreen: SelectOptionLegsScreenParams;
  ViewResultsScreen: ViewResultsScreenParams;
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