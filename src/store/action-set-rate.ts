import { NumberFormatValues } from 'react-number-format';
import { Action } from 'redux';

export const ACTION_SET_RATE = 'SetRate';

export type ActionSetRate = Action<typeof ACTION_SET_RATE> & {
  payload: {
    formatted: string;
    float: number | undefined;
  };
};

export const isActionSetRate = (action: Action): action is ActionSetRate => (
  action.type === ACTION_SET_RATE
);

export const setRate = (values: NumberFormatValues): ActionSetRate => ({
  type: ACTION_SET_RATE,
  payload: {
    formatted: values.formattedValue,
    float: values.floatValue,
  },
});
