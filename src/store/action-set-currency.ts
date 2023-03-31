import { Action } from 'redux';

export const ACTION_SET_CURRENCY = 'SetCurrency';

export type ActionSetCurrency = Action<typeof ACTION_SET_CURRENCY> & {
  payload: string;
};

export const isActionSetCurrency = (action: Action): action is ActionSetCurrency => (
  action.type === ACTION_SET_CURRENCY
);

export const setCurrency = (currency: string): ActionSetCurrency => ({
  type: ACTION_SET_CURRENCY,
  payload: currency,
});
