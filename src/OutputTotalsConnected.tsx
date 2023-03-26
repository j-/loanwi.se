import React from 'react';
import Dollars from './Dollars';
import { useAppSelector } from './store';
import {
  selectInputsValid,
  selectPrincipal,
  selectTotalInterest,
  selectTotalPayments,
} from './store/reducer-root';

const OutputTotalsConnected: React.FC = () => {
  const isValid = useAppSelector(selectInputsValid);

  const loanPrincipal = useAppSelector(selectPrincipal);
  const totalPayments = useAppSelector(selectTotalPayments);
  const totalInterestPaid = useAppSelector(selectTotalInterest);

  return (
    isValid ? (
      <div>
        <p><Dollars value={loanPrincipal} round /> principal</p>
        <p><Dollars value={totalInterestPaid} round /> total interest paid</p>
        <p><Dollars value={totalPayments} round /> total payments</p>
      </div>
     ) : null
  );
};

export default OutputTotalsConnected;
