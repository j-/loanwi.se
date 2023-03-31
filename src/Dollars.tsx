import { FC, useMemo } from 'react';
import { useAppSelector } from './store';
import { selectCurrencyCode } from './store/reducer-root';

export type DollarsProps = {
  value: number;
  children?: never;
};

const Dollars: FC<DollarsProps> = (props) => {
  const currency = useAppSelector(selectCurrencyCode);

  const formatter = useMemo(() => {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency,
      currencyDisplay: 'narrowSymbol',
      maximumFractionDigits: 0,
    });
  }, [currency]);

  return <>{formatter.format(props.value)}</>;
};

export default Dollars;
