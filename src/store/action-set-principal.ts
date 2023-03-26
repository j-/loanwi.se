import { Action } from 'redux';

export const ACTION_SET_PRINCIPAL = 'SetPrincipal';

export type ActionSetPrincipal = Action<typeof ACTION_SET_PRINCIPAL> & {
  payload: number;
};

export const isActionSetPrincipal = (action: Action): action is ActionSetPrincipal => (
  action.type === ACTION_SET_PRINCIPAL
);

export const setPrincipal = (principal: number): ActionSetPrincipal => ({
  type: ACTION_SET_PRINCIPAL,
  payload: principal,
});
