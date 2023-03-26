import { memo } from 'react';
import Dollars from './Dollars';
import { RepaymentFrequency, repaymentPerLabel } from './repayments';

export type OutputRepaymentAmountProps = {
  value: number;
  frequency: RepaymentFrequency;
  children?: never;
};

const OutputRepaymentAmount = memo<OutputRepaymentAmountProps>(({ value, frequency }) => (
  <div className="bg-gray-100">
    <div className={`h-1 bg-black w-[${1 / frequency * 100}%]`} />
    <span className="text-4xl">
      <Dollars value={value} round />
    </span> / {repaymentPerLabel[frequency]}
  </div>
));

OutputRepaymentAmount.displayName = 'OutputRepaymentAmount';

export default OutputRepaymentAmount;
