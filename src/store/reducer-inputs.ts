import { Reducer } from 'redux';
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
};

export const initialState: ReducerState = {
  principal: DEFAULT_LOAN_PRINCIPAL,
  rate: DEFAULT_INTEREST_RATE_PERCENT,
  term: DEFAULT_LOAN_TERM,
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

  return state;
};

export const selectPrincipal = (state: ReducerState) => state.principal;
export const selectRate = (state: ReducerState) => state.rate;
export const selectTerm = (state: ReducerState) => state.term;
