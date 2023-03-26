import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './store';
import { setPrincipal } from './store/action-set-principal';
import { selectPrincipal } from './store/reducer-root';

export const usePrincipal = () => {
  const dispatch = useAppDispatch();
  const value = useAppSelector(selectPrincipal);
  const update = useCallback((value: number) => {
    dispatch(setPrincipal(value));
  }, [dispatch]);
  return [value, update] as const;
};
