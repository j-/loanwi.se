import { Reducer } from 'redux';
import { RepaymentFrequency } from '../repayments';
import { isActionSetFrequency } from './action-set-frequency';
import { isActionSetPrincipal } from './action-set-principal';
import { isActionSetRate } from './action-set-rate';
import { isActionSetTerm } from './action-set-term';

const DEFAULT_LOAN_PRINCIPAL_FORMATTED = '30 000';
const DEFAULT_LOAN_PRINCIPAL_FLOAT = 30000;
const DEFAULT_INTEREST_RATE_PERCENT_FORMATTED = '15.9';
const DEFAULT_INTEREST_RATE_PERCENT_FLOAT = 15.9;
const DEFAULT_LOAN_TERM_FORMATTED = '7';
const DEFAULT_LOAN_TERM_FLOAT = 7;

export type ReducerState = {
  principalFloat: number;
  principalFormatted: string;
  rateFloat: number;
  rateFormatted: string;
  termFloat: number;
  termFormatted: string;
  frequency: RepaymentFrequency;
};

export const initialState: ReducerState = {
  principalFloat: DEFAULT_LOAN_PRINCIPAL_FLOAT,
  principalFormatted: DEFAULT_LOAN_PRINCIPAL_FORMATTED,
  rateFloat: DEFAULT_INTEREST_RATE_PERCENT_FLOAT,
  rateFormatted: DEFAULT_INTEREST_RATE_PERCENT_FORMATTED,
  termFloat: DEFAULT_LOAN_TERM_FLOAT,
  termFormatted: DEFAULT_LOAN_TERM_FORMATTED,
  frequency: RepaymentFrequency.MONTHLY,
};

export const reducer: Reducer<ReducerState> = (state = initialState, action) => {
  if (isActionSetPrincipal(action)) {
    return {
      ...state,
      principalFloat: action.payload.float || state.principalFloat,
      principalFormatted: action.payload.formatted,
    };
  }

  if (isActionSetRate(action)) {
    return {
      ...state,
      rateFloat: action.payload.float || state.rateFloat,
      rateFormatted: action.payload.formatted,
    };
  }

  if (isActionSetTerm(action)) {
    return {
      ...state,
      termFloat: action.payload.float || state.termFloat,
      termFormatted: action.payload.formatted,
    };
  }

  if (isActionSetFrequency(action)) {
    return {
      ...state,
      frequency: action.payload,
    };
  }

  return state;
};

export const selectPrincipalFloat = (state: ReducerState) => state.principalFloat;
export const selectPrincipalFormatted = (state: ReducerState) => state.principalFormatted;
export const selectRateFloat = (state: ReducerState) => state.rateFloat;
export const selectRateFormatted = (state: ReducerState) => state.rateFormatted;
export const selectTermFloat = (state: ReducerState) => state.termFloat;
export const selectTermFormatted = (state: ReducerState) => state.termFormatted;
export const selectFrequency = (state: ReducerState) => state.frequency;
