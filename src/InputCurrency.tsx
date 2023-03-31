import React, { useCallback, useId } from 'react';
import { currencies } from './currencies';
import { Field } from './types';
import { useCurrency } from './use-currency';

const InputCurrency: React.FC = () => {
  const id = `InputCurrency-${useId()}`;

  const [currency, setCurrency] = useCurrency();

  const handleChangeCurrency = useCallback<React.ChangeEventHandler<HTMLSelectElement>>((e) => {
    setCurrency(e.currentTarget.value);
  }, [setCurrency]);

  return (
    <div className="flex-1">
      <label htmlFor={id} className="text-grey-darker inline-block mb-2">Currency</label><br />
      <div className="flex flex-wrap items-stretch w-full relative">
        <select
          id={id}
          name={Field.CURRENCY}
          className="flex-shrink flex-grow leading-normal w-px flex-1 border h-12 border-grey-light rounded px-3 relative bg-white"
          value={currency}
          onChange={handleChangeCurrency}
        >
          {currencies.map(([code, symbol]) => (
            <option key={code} value={code}>{code} ({symbol})</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default InputCurrency;
