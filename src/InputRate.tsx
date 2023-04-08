import React, { useCallback, useId } from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { useRate } from './use-rate';
import { Field } from './types';

const MAX_LIMIT = 100;

const InputRate: React.FC = () => {
  const id = `InputRate-${useId()}`;

  const [{ formatted: rate }, setRate] = useRate();

  const handleChangeInterestRate = useCallback<NonNullable<NumericFormatProps<unknown>['onValueChange']>>((values) => {
    setRate(values);
  }, [setRate]);

  return (
    <div className="flex-1">
      <label htmlFor={id} className="text-grey-darker inline-block mb-2">Interest rate</label><br />
      <div className="flex flex-wrap items-stretch w-full relative">
        <NumericFormat
          id={id}
          name={Field.INTEREST_RATE}
          className="flex-shrink flex-grow leading-normal w-px flex-1 border h-16 border-grey-light rounded rounded-r-none px-3 relative bg-white"
          value={rate}
          onValueChange={handleChangeInterestRate}
          min={0}
          max={MAX_LIMIT}
          isAllowed={(values) => {
            const { floatValue } = values;
            return floatValue == null || floatValue <= MAX_LIMIT;
          }}
          allowNegative={false}
          decimalScale={2}
          step={0.1}
        />
        <div className="flex -mr-px">
          <span className="flex items-center leading-normal bg-white rounded rounded-l-none border border-l-0 border-grey-light px-3 whitespace-no-wrap text-grey-dark text-sm">%</span>
        </div>
      </div>
    </div>
  );
};

export default InputRate;
