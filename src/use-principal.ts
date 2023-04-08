import { useCallback } from 'react';
import { NumberFormatValues } from 'react-number-format';
import { useAppDispatch, useAppSelector } from './store';
import { setPrincipal } from './store/action-set-principal';
import { selectPrincipalFloat, selectPrincipalFormatted } from './store/reducer-root';

export const usePrincipal = () => {
  const dispatch = useAppDispatch();
  const float = useAppSelector(selectPrincipalFloat);
  const formatted = useAppSelector(selectPrincipalFormatted);
  const update = useCallback((values: NumberFormatValues) => {
    dispatch(setPrincipal(values));
  }, [dispatch]);
  return [{ float, formatted }, update] as const;
};
