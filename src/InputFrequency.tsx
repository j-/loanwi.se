import React, { useCallback, useId } from 'react';
import { RepaymentFrequency } from './repayments';
import { Field } from './types';
import { useFrequency } from './use-frequency';

const InputFrequency: React.FC = () => {
  const id = `InputFrequency-${useId()}`;

  const [repaymentFrequency, setFrequency] = useFrequency();

  const handleChangeRepaymentFrequency = useCallback<React.ChangeEventHandler<HTMLSelectElement>>((e) => {
    setFrequency(
      Number(e.currentTarget.value) as RepaymentFrequency
    );
  }, [setFrequency]);

  return (
    <div className="flex-1">
      <label htmlFor={id} className="text-grey-darker inline-block mb-2">Repayment frequency</label><br />
      <div className="flex flex-wrap items-stretch w-full relative">
        <select
          id={id}
          name={Field.FREQUENCY}
          className="appearance-none flex-shrink flex-grow leading-normal w-px flex-1 border h-12 border-grey-light rounded px-3 relative bg-white"
          value={repaymentFrequency}
          onChange={handleChangeRepaymentFrequency}
        >
          <option value={RepaymentFrequency.ANNUALLY}>Annually</option>
          <option value={RepaymentFrequency.MONTHLY}>Monthly</option>
          <option value={RepaymentFrequency.FORTNIGHTLY}>Fortnightly</option>
          <option value={RepaymentFrequency.WEEKLY}>Weekly</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="m6 7 4 4 4-4 1 1-5 5-5-5z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default InputFrequency;
