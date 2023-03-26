import { memo } from 'react';

export type DollarsProps = {
  value: number;
  round?: boolean;
  children?: never;
};

export const currency = 'AUD';

const decimalFormatter = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency,
  currencyDisplay: 'narrowSymbol',
});

const integerFormatter = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency,
  currencyDisplay: 'narrowSymbol',
  maximumFractionDigits: 0,
});

const getSymbol = (formatter: Intl.NumberFormat, defaultSymbol = '$') => (
  formatter
    .formatToParts(0)
    .find((part) => part.type === 'currency')
    ?.value || defaultSymbol
);

export const symbol = getSymbol(integerFormatter);

export const dollars = (value = 0, round = false) => {
  const formatter = round ? integerFormatter : decimalFormatter;
  const formatted = formatter.format(value);
  return formatted;
};

const Dollars = memo<DollarsProps>((props) => {
  return <>{dollars(props.value, props.round)}</>;
});

Dollars.displayName = 'Dollars';

export default Dollars;
