
import { Stock } from "../graphql/types";
import { AppState } from "../types";

/* 
 * Action Types 
 */
export const SET_IS_LOADING = 'optionally-app/app/SET_IS_LOADING';
export const SET_SELECTED_STOCK = 'optionally-app/app/SET_SELECTED_STOCK';
export const SET_ERROR = 'optionally-app/app/SET_ERROR';

interface SetIsLoadingAppAction {
    type: typeof SET_IS_LOADING,
    newValue: boolean,
    message?: string
};

interface SetSelectedStockAppAction {
    type: typeof SET_SELECTED_STOCK,
    stock: Stock
};

// TODO: declare error type with severity and message
interface SetErrorAppAction {
    type: typeof SET_ERROR,
    message: string
};

export type AppActionTypes = SetIsLoadingAppAction | SetSelectedStockAppAction | SetErrorAppAction;

/*
 * Action Creators
 */
export function setIsLoading(newValue: boolean, message?: string): SetIsLoadingAppAction {
    return { 
        type: SET_IS_LOADING,
        newValue: newValue,
        message: message 
    };
}

export function setSelectedStock(stock: Stock): SetSelectedStockAppAction {
    return {
        type: SET_SELECTED_STOCK,
        stock: stock
    };
}

export function setError(message: string): SetErrorAppAction {
    return {
        type: SET_ERROR,
        message: message
    };
}

/*
 * Reducer
 */
const initialState: AppState = { isLoading: false };

export default function reducer(state: AppState = initialState, action: AppActionTypes): AppState {
    switch (action.type) {
        case SET_ERROR:
            return {
                ...state,
                error: action.message
            };
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.newValue,
                loadingMessage: action.message
            };
        case SET_SELECTED_STOCK:
            return {
                ...state,
                selectedStock: action.stock
            };
        default:
            return state;
    }
}