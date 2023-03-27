import React, { useCallback, useId } from 'react';
import { useTerm } from './use-term';
import { Field } from './types';

const InputTerm: React.FC = () => {
  const id = `InputTerm-${useId()}`;

  const [term, setTerm] = useTerm();

  const handleChangeLoanTerm = useCallback<React.ChangeEventHandler<HTMLInputElement>>((e) => {
    setTerm(e.currentTarget.valueAsNumber);
  }, [setTerm]);

  return (
    <div className="flex-1">
      <label htmlFor={id} className="text-grey-darker inline-block mb-2">Loan term</label><br />
      <div className="flex flex-wrap items-stretch w-full relative">
        <input
          id={id}
          name={Field.LOAN_TERM}
          className="flex-shrink flex-grow leading-normal w-px flex-1 border h-16 border-grey-light rounded rounded-r-none px-3 relative bg-white"
          type="number"
          value={term}
          onChange={handleChangeLoanTerm}
          inputMode="numeric"
          min={1}
          max={100}
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
