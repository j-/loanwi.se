import { NumberFormatValues } from 'react-number-format';
import { Action } from 'redux';

export const ACTION_SET_TERM = 'SetTerm';

export type ActionSetTerm = Action<typeof ACTION_SET_TERM> & {
  payload: {
    formatted: string;
    float: number | undefined;
  };
};

export const isActionSetTerm = (action: Action): action is ActionSetTerm => (
  action.type === ACTION_SET_TERM
);

export const setTerm = (values: NumberFormatValues): ActionSetTerm => ({
  type: ACTION_SET_TERM,
  payload: {
    formatted: values.formattedValue,
    float: values.floatValue,
  },
});
