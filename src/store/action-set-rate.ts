import { Action } from 'redux';

export const ACTION_SET_RATE = 'SetRate';

export type ActionSetRate = Action<typeof ACTION_SET_RATE> & {
  payload: number;
};

export const isActionSetRate = (action: Action): action is ActionSetRate => (
  action.type === ACTION_SET_RATE
);

export const setRate = (rate: number): ActionSetRate => ({
  type: ACTION_SET_RATE,
  payload: rate,
});
