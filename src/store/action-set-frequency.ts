import { Action } from 'redux';
import { RepaymentFrequency } from '../repayments';

export const ACTION_SET_FREQUENCY = 'SetFrequency';

export type ActionSetFrequency = Action<typeof ACTION_SET_FREQUENCY> & {
  payload: RepaymentFrequency;
};

export const isActionSetFrequency = (action: Action): action is ActionSetFrequency => (
  action.type === ACTION_SET_FREQUENCY
);

export const setFrequency = (frequency: RepaymentFrequency): ActionSetFrequency => ({
  type: ACTION_SET_FREQUENCY,
  payload: frequency,
});
