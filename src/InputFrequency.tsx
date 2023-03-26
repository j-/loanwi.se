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
      <label htmlFor={id}>Repayment frequency</label><br />
      <div className="flex flex-wrap items-stretch w-full mb-4 relative">
        <select
          id={id}
          name={Field.FREQUENCY}
          className="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border h-10 h-12 border-grey-light rounded px-3 relative"
          value={repaymentFrequency}
          onChange={handleChangeRepaymentFrequency}
        >
          <option value={RepaymentFrequency.ANNUALLY}>Annually</option>
          <option value={RepaymentFrequency.MONTHLY}>Monthly</option>
          <option value={RepaymentFrequency.FORTNIGHTLY}>Fortnightly</option>
          <option value={RepaymentFrequency.WEEKLY}>Weekly</option>
        </select>
      </div>
    </div>
  );
};

export default InputFrequency;
