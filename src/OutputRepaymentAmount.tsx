import { memo } from 'react';
import Dollars from './Dollars';
import { RepaymentFrequency, repaymentPerLabel } from './repayments';

export type OutputRepaymentAmountProps = {
  value: number;
  frequency: RepaymentFrequency;
  children?: never;
};

const OutputRepaymentAmount = memo<OutputRepaymentAmountProps>(({ value, frequency }) => (
  <div className="bg-rose-50 rounded p-1">
    <div className="h-1 bg-red-200 rounded-full" style={{ width: 1 / frequency * 100 + '%' }} />
    <span className="text-4xl">
      <Dollars value={value} />
    </span> / {repaymentPerLabel[frequency]}
  </div>
));

OutputRepaymentAmount.displayName = 'OutputRepaymentAmount';

export default OutputRepaymentAmount;
