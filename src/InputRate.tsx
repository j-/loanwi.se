import React, { useCallback, useId } from 'react';
import { useRate } from './use-rate';
import { Field } from './types';

const InputRate: React.FC = () => {
  const id = `InputRate-${useId()}`;

  const [rate, setRate] = useRate();

  const handleChangeInterestRate = useCallback<React.ChangeEventHandler<HTMLInputElement>>((e) => {
    setRate(e.currentTarget.valueAsNumber);
  }, [setRate]);

  return (
    <div className="flex-1">
      <label htmlFor={id} className="text-grey-darker inline-block mb-2">Interest rate</label><br />
      <div className="flex flex-wrap items-stretch w-full relative bg-white">
        <input
          id={id}
          name={Field.INTEREST_RATE}
          className="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border h-16 border-grey-light rounded rounded-r-none px-3 relative"
          type="number"
          value={rate}
          onChange={handleChangeInterestRate}
          inputMode="numeric"
          min={0}
          max={100}
          step={0.1}
        />
        <div className="flex -mr-px">
          <span className="flex items-center leading-normal bg-grey-lighter rounded rounded-l-none border border-l-0 border-grey-light px-3 whitespace-no-wrap text-grey-dark text-sm">%</span>
        </div>
      </div>
    </div>
  );
};

export default InputRate;
