import React from 'react';
import OutputTotalsChart from './OutputTotalsChart';
import { useAppSelector } from './store';
import {
  selectInputsValid,
  selectPrincipal,
  selectTotalInterest,
  selectTotalPayments,
} from './store/reducer-root';

const OutputTotalsChartConnected: React.FC = () => {
  const isValid = useAppSelector(selectInputsValid);

  const loanPrincipal = useAppSelector(selectPrincipal);
  const totalPayments = useAppSelector(selectTotalPayments);
  const totalInterestPaid = useAppSelector(selectTotalInterest);

  return (
    isValid ? (
      <OutputTotalsChart
        loanPrincipal={loanPrincipal}
        totalPayments={totalPayments}
        totalInterestPaid={totalInterestPaid}
      />
    ): null
  );
};

export default OutputTotalsChartConnected;
