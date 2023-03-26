import { Action } from 'redux';

export const ACTION_SET_TERM = 'SetTerm';

export type ActionSetTerm = Action<typeof ACTION_SET_TERM> & {
  payload: number;
};

export const isActionSetTerm = (action: Action): action is ActionSetTerm => (
  action.type === ACTION_SET_TERM
);

export const setTerm = (principal: number): ActionSetTerm => ({
  type: ACTION_SET_TERM,
  payload: principal,
});
