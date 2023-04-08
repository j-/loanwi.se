import React, { useId } from 'react';
import { NumericFormat } from 'react-number-format';
import { useTerm } from './use-term';
import { Field } from './types';

const MAX_LIMIT = 1_000;

const InputTerm: React.FC = () => {
  const id = `InputTerm-${useId()}`;

  const [{ formatted: term }, setTerm] = useTerm();

  return (
    <div className="flex-1">
      <label htmlFor={id} className="text-grey-darker inline-block mb-2">Loan term</label><br />
      <div className="flex flex-wrap items-stretch w-full relative">
        <NumericFormat
          id={id}
          name={Field.LOAN_TERM}
          className="flex-shrink flex-grow leading-normal w-px flex-1 border h-16 border-grey-light rounded rounded-r-none px-3 relative bg-white"
          value={term}
          onValueChange={setTerm}
          min={1}
          max={MAX_LIMIT}
          isAllowed={(values) => {
            const { floatValue } = values;
            return floatValue == null || floatValue <= MAX_LIMIT;
          }}
          allowNegative={false}
          decimalScale={0}
          step={1}
        />
        <div className="flex -mr-px">
          <span className="flex items-center leading-normal bg-white rounded rounded-l-none border border-l-0 border-grey-light px-3 whitespace-no-wrap text-grey-dark text-sm">years</span>
        </div>
      </div>
    </div>
  );
};

export default InputTerm;
