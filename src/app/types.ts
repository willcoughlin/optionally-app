import { CalculatorInput, CalculatorResult, Stock } from "./graphql/types";

export interface AppState {
    error?: string,
    isLoading: boolean,
    loadingMessage?: string,
    selectedStock?: Stock,
    calculatorInput?: CalculatorInput
    calculatorResult?: CalculatorResult
};

