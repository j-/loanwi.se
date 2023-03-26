import { memo } from 'react';
import OutputRepaymentAmount from './OutputRepaymentAmount';
import { RepaymentFrequency } from './repayments';

export type OutputRepaymentAmountsProps = {
  annualRepaymentAmount: number;
  monthlyRepaymentAmount: number;
  fortnightlyRepaymentAmount: number;
  weeklyRepaymentAmount: number;
  children?: never;
};

const OutputRepaymentAmounts = memo<OutputRepaymentAmountsProps>(({
  annualRepaymentAmount,
  monthlyRepaymentAmount,
  fortnightlyRepaymentAmount,
  weeklyRepaymentAmount,
}) => (
  <div className="flex flex-col sm:mt-8 gap-1 sm:gap-2">
    <OutputRepaymentAmount
      value={annualRepaymentAmount}
      frequency={RepaymentFrequency.ANNUALLY}
    />
    <OutputRepaymentAmount
      value={monthlyRepaymentAmount}
      frequency={RepaymentFrequency.MONTHLY}
    />
    <OutputRepaymentAmount
      value={fortnightlyRepaymentAmount}
      frequency={RepaymentFrequency.FORTNIGHTLY}
    />
    <OutputRepaymentAmount
      value={weeklyRepaymentAmount}
      frequency={RepaymentFrequency.WEEKLY}
    />
  </div>
));

OutputRepaymentAmounts.displayName = 'OutputRepaymentAmounts';

export default OutputRepaymentAmounts;
