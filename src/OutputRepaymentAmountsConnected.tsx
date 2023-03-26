import React from 'react';
import OutputRepaymentAmounts from './OutputRepaymentAmounts';
import { useAppSelector } from './store';
import {
  selectAnnualRepaymentAmount,
  selectFortnightlyRepaymentAmount,
  selectInputsValid,
  selectMonthlyRepaymentAmount,
  selectWeeklyRepaymentAmount,
} from './store/reducer-root';

const OutputRepaymentAmountsConnected: React.FC = () => {
  const isValid = useAppSelector(selectInputsValid);

  const monthlyRepaymentAmount = useAppSelector(selectMonthlyRepaymentAmount);
  const annualRepaymentAmount = useAppSelector(selectAnnualRepaymentAmount);
  const fortnightlyRepaymentAmount = useAppSelector(selectFortnightlyRepaymentAmount);
  const weeklyRepaymentAmount = useAppSelector(selectWeeklyRepaymentAmount);

  return (
    isValid ? (
      <OutputRepaymentAmounts
        annualRepaymentAmount={annualRepaymentAmount}
        monthlyRepaymentAmount={monthlyRepaymentAmount}
        fortnightlyRepaymentAmount={fortnightlyRepaymentAmount}
        weeklyRepaymentAmount={weeklyRepaymentAmount}
      />
    ) : null
  );
};

export default OutputRepaymentAmountsConnected;
