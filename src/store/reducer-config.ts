import { Reducer } from 'redux';
import { createSelector } from 'reselect';
import { isActionSetCurrency } from './action-set-currency';

const DEFAULT_CURRENCY = 'AUD';

export type ReducerState = {
  currency: string;
};

export const initialState: ReducerState = {
  currency: DEFAULT_CURRENCY,
};

export const reducer: Reducer<ReducerState> = (state = initialState, action) => {
  if (isActionSetCurrency(action)) {
    return {
      ...state,
      currency: action.payload,
    };
  }

  return state;
};

export const selectCurrencyCode = (state: ReducerState) => state.currency;

export const selectCurrencySymbol = createSelector(selectCurrencyCode, (code) => {
  const formatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: code,
    currencyDisplay: 'narrowSymbol',
    maximumFractionDigits: 0,
  });

  const getSymbol = (formatter: Intl.NumberFormat, defaultSymbol = '$') => (
    formatter
      .formatToParts(0)
      .find((part) => part.type === 'currency')
      ?.value || defaultSymbol
  );

  return getSymbol(formatter);
});
