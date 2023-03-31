import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storageLocal from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session';
import { createSelector } from 'reselect';
import { calculateRepaymentAmount, RepaymentFrequency } from '../repayments';
import * as config from './reducer-config';
import * as inputs from './reducer-inputs';

export type ReducerState = {
  config: config.ReducerState;
  inputs: inputs.ReducerState;
};

export const initialState: ReducerState = {
  config: config.initialState,
  inputs: inputs.initialState,
};

export const reducer = combineReducers({
  config: persistReducer({
    key: 'config',
    storage: storageLocal,
  }, config.reducer),
  inputs: persistReducer({
    key: 'inputs',
    storage: storageSession,
  }, inputs.reducer),
});

const selectConfig = (state: ReducerState) => state.config;
const selectInputs = (state: ReducerState) => state.inputs;

export const selectCurrencyCode = createSelector(selectConfig, config.selectCurrencyCode);
export const selectCurrencySymbol = createSelector(selectConfig, config.selectCurrencySymbol);
export const selectPrincipal = createSelector(selectInputs, inputs.selectPrincipal);
export const selectRate = createSelector(selectInputs, inputs.selectRate);
export const selectTerm = createSelector(selectInputs, inputs.selectTerm);
export const selectFrequency = createSelector(selectInputs, inputs.selectFrequency);

export const selectInputsValid = createSelector(
  [selectPrincipal, selectRate, selectTerm],
  (principal, rate, term) => (
    !isNaN(principal) && principal > 0 &&
    !isNaN(rate) && rate > 0 &&
    !isNaN(term) && term > 0
  ),
);

export const selectMonthlyRepaymentAmount = createSelector(
  [selectPrincipal, selectRate, selectTerm],
  (principal, rate, term) => (
    calculateRepaymentAmount({
      loanPrincipal: principal,
      interestRate: rate,
      loanTerm: term,
      repaymentFrequency: RepaymentFrequency.MONTHLY,
    })
  ),
);

export const selectAnnualRepaymentAmount = createSelector(
  [selectPrincipal, selectRate, selectTerm],
  (principal, rate, term) => (
    calculateRepaymentAmount({
      loanPrincipal: principal,
      interestRate: rate,
      loanTerm: term,
      repaymentFrequency: RepaymentFrequency.ANNUALLY,
    })
  ),
);

export const selectFortnightlyRepaymentAmount = createSelector(
  [selectPrincipal, selectRate, selectTerm],
  (principal, rate, term) => (
    calculateRepaymentAmount({
      loanPrincipal: principal,
      interestRate: rate,
      loanTerm: term,
      repaymentFrequency: RepaymentFrequency.FORTNIGHTLY,
    })
  ),
);

export const selectWeeklyRepaymentAmount = createSelector(
  [selectPrincipal, selectRate, selectTerm],
  (principal, rate, term) => (
    calculateRepaymentAmount({
      loanPrincipal: principal,
      interestRate: rate,
      loanTerm: term,
      repaymentFrequency: RepaymentFrequency.WEEKLY,
    })
  ),
);

export const selectTotalPayments = createSelector(
  [
    selectAnnualRepaymentAmount,
    selectFortnightlyRepaymentAmount,
    selectTerm,
    selectMonthlyRepaymentAmount,
    selectFrequency,
    selectWeeklyRepaymentAmount,
  ],
  (
    annualRepaymentAmount,
    fortnightlyRepaymentAmount,
    loanTerm,
    monthlyRepaymentAmount,
    repaymentFrequency,
    weeklyRepaymentAmount,
  ) => {
    switch (repaymentFrequency) {
      case RepaymentFrequency.ANNUALLY:
        return annualRepaymentAmount * loanTerm;
      case RepaymentFrequency.MONTHLY:
        return monthlyRepaymentAmount * RepaymentFrequency.MONTHLY * loanTerm;
      case RepaymentFrequency.FORTNIGHTLY:
        return fortnightlyRepaymentAmount * RepaymentFrequency.FORTNIGHTLY * loanTerm;
      case RepaymentFrequency.WEEKLY:
        return weeklyRepaymentAmount * RepaymentFrequency.WEEKLY * loanTerm;
    }
  },
);

export const selectTotalInterest = createSelector(
  [
    selectPrincipal,
    selectTotalPayments
  ],
  (
    principal,
    totalPayments,
  ) => (
    totalPayments - principal
  ),
);
