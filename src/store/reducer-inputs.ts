import { Reducer } from 'redux';
import { RepaymentFrequency } from '../repayments';
import { isActionSetFrequency } from './action-set-frequency';
import { isActionSetPrincipal } from './action-set-principal';
import { isActionSetRate } from './action-set-rate';
import { isActionSetTerm } from './action-set-term';

const DEFAULT_LOAN_PRINCIPAL = 30000;
const DEFAULT_INTEREST_RATE_PERCENT = 15.9;
const DEFAULT_LOAN_TERM = 7;

export type ReducerState = {
  principal: number;
  rate: number;
  term: number;
  frequency: RepaymentFrequency;
};

export const initialState: ReducerState = {
  principal: DEFAULT_LOAN_PRINCIPAL,
  rate: DEFAULT_INTEREST_RATE_PERCENT,
  term: DEFAULT_LOAN_TERM,
  frequency: RepaymentFrequency.MONTHLY,
};

export const reducer: Reducer<ReducerState> = (state = initialState, action) => {
  if (isActionSetPrincipal(action)) {
    return {
      ...state,
      principal: action.payload,
    };
  }

  if (isActionSetRate(action)) {
    return {
      ...state,
      rate: action.payload,
    };
  }

  if (isActionSetTerm(action)) {
    return {
      ...state,
      term: action.payload,
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

export const selectPrincipal = (state: ReducerState) => state.principal;
export const selectRate = (state: ReducerState) => state.rate;
export const selectTerm = (state: ReducerState) => state.term;
export const selectFrequency = (state: ReducerState) => state.frequency;
