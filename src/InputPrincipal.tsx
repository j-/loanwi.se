import React, { useCallback, useId } from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { usePrincipal } from './use-principal';
import { Field } from './types';
import { useAppSelector } from './store';
import { selectCurrencySymbol } from './store/reducer-root';

const MAX_LIMIT = 999_999_999;

const InputPrincipal: React.FC = () => {
  const id = `InputPrincipal-${useId()}`;

  const [{ formatted: principal }, setPrincipal] = usePrincipal();
  const symbol = useAppSelector(selectCurrencySymbol);

  const handleValueChange = useCallback<NonNullable<NumericFormatProps<unknown>['onValueChange']>>((values) => {
    setPrincipal(values);
  }, [setPrincipal]);

  return (
    <div className="flex-1">
      <label htmlFor={id} className="text-grey-darker inline-block mb-2">Loan amount</label><br />
      <div className="flex flex-wrap items-stretch w-full relative">
        <div className="flex -mr-px">
          <span className="flex items-center leading-normal bg-white rounded rounded-r-none border border-r-0 border-grey-light px-3 whitespace-no-wrap text-grey-dark text-sm">{symbol}</span>
        </div>
        <NumericFormat
          id={id}
          name={Field.LOAN_PRINCIPAL}
          className="flex-shrink flex-grow leading-normal w-px flex-1 border h-16 text-lg border-grey-light rounded rounded-l-none px-3 relative focus:border-blue focus:shadow bg-white"
          value={principal}
          onValueChange={handleValueChange}
          thousandSeparator=" "
          min={0}
          max={MAX_LIMIT}
          isAllowed={(values) => {
            const { floatValue } = values;
            return floatValue == null || floatValue <= MAX_LIMIT;
          }}
          allowNegative={false}
          decimalScale={0}
        />
      </div>
    </div>
  );
};

export default InputPrincipal;
