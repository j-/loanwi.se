import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './store';
import { setRate } from './store/action-set-rate';
import { selectRate } from './store/reducer-root';

export const useRate = () => {
  const dispatch = useAppDispatch();
  const value = useAppSelector(selectRate);
  const update = useCallback((value: number) => {
    dispatch(setRate(value));
  }, [dispatch]);
  return [value, update] as const;
};
