import React, { useCallback, useId } from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { symbol } from './Dollars';
import { usePrincipal } from './use-principal';
import { Field } from './types';

const InputPrincipal: React.FC = () => {
  const id = `InputPrincipal-${useId()}`;

  const [principal, setPrincipal] = usePrincipal();

  const handleValueChange = useCallback<NonNullable<NumericFormatProps<unknown>['onValueChange']>>((values) => {
    setPrincipal(values.floatValue || 0);
  }, [setPrincipal]);

  return (
    <div className="flex-1">
      <label htmlFor={id} className="text-grey-darker inline-block mb-2">Loan amount</label><br />
      <div className="flex flex-wrap items-stretch w-full mb-4 relative">
        <div className="flex -mr-px">
          <span className="flex items-center leading-normal bg-grey-lighter rounded rounded-r-none border border-r-0 border-grey-light px-3 whitespace-no-wrap text-grey-dark text-sm">{symbol}</span>
        </div>
        <NumericFormat
          id={id}
          name={Field.LOAN_PRINCIPAL}
          className="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border h-10 h-16 text-lg border-grey-light rounded rounded-l-none px-3 relative focus:border-blue focus:shadow"
          value={principal}
          onValueChange={handleValueChange}
          thousandSeparator=" "
          inputMode="numeric"
          min={0}
          max={999999999}
        />
      </div>
    </div>
  );
};

export default InputPrincipal;
