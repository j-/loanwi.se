import React from 'react';
import OutputTotalsTable from './OutputTotalsTable';
import { useAppSelector } from './store';
import {
  selectInputsValid,
  selectPrincipal,
  selectTotalInterest,
  selectTotalPayments,
} from './store/reducer-root';

const OutputTotalsTableConnected: React.FC = () => {
  const isValid = useAppSelector(selectInputsValid);

  const loanPrincipal = useAppSelector(selectPrincipal);
  const totalPayments = useAppSelector(selectTotalPayments);
  const totalInterestPaid = useAppSelector(selectTotalInterest);

  return (
    isValid ? (
      <OutputTotalsTable
        loanPrincipal={loanPrincipal}
        totalPayments={totalPayments}
        totalInterestPaid={totalInterestPaid}
      />
    ): null
  );
};

export default OutputTotalsTableConnected;
