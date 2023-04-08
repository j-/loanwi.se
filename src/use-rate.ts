import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './store';
import { setRate } from './store/action-set-rate';
import { selectRateFloat, selectRateFormatted } from './store/reducer-root';
import { NumberFormatValues } from 'react-number-format';

export const useRate = () => {
  const dispatch = useAppDispatch();
  const float = useAppSelector(selectRateFloat);
  const formatted = useAppSelector(selectRateFormatted);
  const update = useCallback((values: NumberFormatValues) => {
    dispatch(setRate(values));
  }, [dispatch]);
  return [{ float, formatted }, update] as const;
};
