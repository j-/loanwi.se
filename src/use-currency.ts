import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './store';
import { setCurrency } from './store/action-set-currency';
import { selectCurrencyCode } from './store/reducer-root';

export const useCurrency = () => {
  const dispatch = useAppDispatch();
  const value = useAppSelector(selectCurrencyCode);
  const update = useCallback((value: string) => {
    dispatch(setCurrency(value));
  }, [dispatch]);
  return [value, update] as const;
};
