import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './store';
import { setTerm } from './store/action-set-term';
import { selectTermFloat, selectTermFormatted } from './store/reducer-root';
import { NumberFormatValues } from 'react-number-format';

export const useTerm = () => {
  const dispatch = useAppDispatch();
  const float = useAppSelector(selectTermFloat);
  const formatted = useAppSelector(selectTermFormatted);
  const update = useCallback((values: NumberFormatValues) => {
    dispatch(setTerm(values));
  }, [dispatch]);
  return [{ float, formatted }, update] as const;
};
