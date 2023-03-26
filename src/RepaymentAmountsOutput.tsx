import { memo } from 'react';
import RepaymentAmountOutput from './RepaymentAmountOutput';
import { RepaymentFrequency } from './repayments';

export type RepaymentAmountsOutputProps = {
  annualRepaymentAmount: number;
  monthlyRepaymentAmount: number;
  fortnightlyRepaymentAmount: number;
  weeklyRepaymentAmount: number;
  children?: never;
};

const RepaymentAmountsOutput = memo<RepaymentAmountsOutputProps>(({
  annualRepaymentAmount,
  monthlyRepaymentAmount,
  fortnightlyRepaymentAmount,
  weeklyRepaymentAmount,
}) => (
  <div className="flex flex-col sm:mt-8 gap-1 sm:gap-2">
    <RepaymentAmountOutput
      value={annualRepaymentAmount}
      frequency={RepaymentFrequency.ANNUALLY}
    />
    <RepaymentAmountOutput
      value={monthlyRepaymentAmount}
      frequency={RepaymentFrequency.MONTHLY}
    />
    <RepaymentAmountOutput
      value={fortnightlyRepaymentAmount}
      frequency={RepaymentFrequency.FORTNIGHTLY}
    />
    <RepaymentAmountOutput
      value={weeklyRepaymentAmount}
      frequency={RepaymentFrequency.WEEKLY}
    />
  </div>
));

RepaymentAmountsOutput.displayName = 'RepaymentAmountsOutput';

export default RepaymentAmountsOutput;
