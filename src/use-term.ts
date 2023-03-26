import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './store';
import { setTerm } from './store/action-set-term';
import { selectTerm } from './store/reducer-root';

export const useTerm = () => {
  const dispatch = useAppDispatch();
  const value = useAppSelector(selectTerm);
  const update = useCallback((value: number) => {
    dispatch(setTerm(value));
  }, [dispatch]);
  return [value, update] as const;
};
