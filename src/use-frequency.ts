import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './store';
import { setFrequency } from './store/action-set-frequency';
import { selectFrequency } from './store/reducer-root';

export const useFrequency = () => {
  const dispatch = useAppDispatch();
  const value = useAppSelector(selectFrequency);
  const update = useCallback((value: number) => {
    dispatch(setFrequency(value));
  }, [dispatch]);
  return [value, update] as const;
};
