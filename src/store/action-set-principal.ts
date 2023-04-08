import { NumberFormatValues } from 'react-number-format';
import { Action } from 'redux';

export const ACTION_SET_PRINCIPAL = 'SetPrincipal';

export type ActionSetPrincipal = Action<typeof ACTION_SET_PRINCIPAL> & {
  payload: {
    formatted: string;
    float: number | undefined;
  };
};

export const isActionSetPrincipal = (action: Action): action is ActionSetPrincipal => (
  action.type === ACTION_SET_PRINCIPAL
);

export const setPrincipal = (values: NumberFormatValues): ActionSetPrincipal => ({
  type: ACTION_SET_PRINCIPAL,
  payload: {
    formatted: values.formattedValue,
    float: values.floatValue,
  },
});
