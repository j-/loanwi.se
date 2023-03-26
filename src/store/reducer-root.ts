import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session'
import { createSelector } from 'reselect';
import * as inputs from './reducer-inputs';

export type ReducerState = {
  inputs: inputs.ReducerState;
};

export const initialState: ReducerState = {
  inputs: inputs.initialState,
};

export const reducer = combineReducers({
  inputs: persistReducer({
    key: 'inputs',
    storage: storageSession,
  }, inputs.reducer),
});

const selectInputs = (state: ReducerState) => state.inputs;

export const selectPrincipal = createSelector(selectInputs, inputs.selectPrincipal);
export const selectRate = createSelector(selectInputs, inputs.selectRate);
export const selectTerm = createSelector(selectInputs, inputs.selectTerm);

export const selectInputsValid = createSelector(
  [selectPrincipal, selectRate, selectTerm],
  (principal, rate, term) => (
    !isNaN(principal) && principal > 0 &&
    !isNaN(rate) && rate > 0 &&
    !isNaN(term) && term > 0
  ),
);
