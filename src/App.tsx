import React, { useCallback } from 'react';
import OutputRepaymentAmounts from './OutputRepaymentAmounts';
import Dollars from './Dollars';
import { usePrincipal } from './use-principal';
import { useAppSelector } from './store';
import {
  selectAnnualRepaymentAmount,
  selectFortnightlyRepaymentAmount,
  selectInputsValid,
  selectMonthlyRepaymentAmount,
  selectTotalInterest,
  selectTotalPayments,
  selectWeeklyRepaymentAmount,
} from './store/reducer-root';
import InputPrincipal from './InputPrincipal';
import InputRate from './InputRate';
import InputTerm from './InputTerm';
import InputFrequency from './InputFrequency';

const App: React.FC = () => {
  const [loanPrincipal] = usePrincipal();

  const isValid = useAppSelector(selectInputsValid);

  const monthlyRepaymentAmount = useAppSelector(selectMonthlyRepaymentAmount);
  const annualRepaymentAmount = useAppSelector(selectAnnualRepaymentAmount);
  const fortnightlyRepaymentAmount = useAppSelector(selectFortnightlyRepaymentAmount);
  const weeklyRepaymentAmount = useAppSelector(selectWeeklyRepaymentAmount);

  const handleSubmitForm = useCallback<React.FormEventHandler>((e) => {
    e.preventDefault();
  }, []);

  const totalPayments = useAppSelector(selectTotalPayments);
  const totalInterestPaid = useAppSelector(selectTotalInterest);

  return (
    <div className="App container my-5">
      <h1 className="text-3xl mb-6">Repayment Calculator</h1>
      <form onSubmit={handleSubmitForm}>
        <div className="sm:flex gap-8">
          <div className="sm:flex-1">
            <InputPrincipal />
            <div className="flex gap-2">
              <InputRate />
              <InputTerm />
            </div>
            <InputFrequency />
            <p><Dollars value={loanPrincipal} round /> principal</p>
            <p><Dollars value={totalInterestPaid} round /> total interest paid</p>
            <p><Dollars value={totalPayments} round /> total payments</p>
          </div>
          <div className="sm:flex-1">
            {isValid && (
              <OutputRepaymentAmounts
                annualRepaymentAmount={annualRepaymentAmount}
                monthlyRepaymentAmount={monthlyRepaymentAmount}
                fortnightlyRepaymentAmount={fortnightlyRepaymentAmount}
                weeklyRepaymentAmount={weeklyRepaymentAmount}
              />
            )}
          </div>
        </div>
      </form>

      <br />

      <p>Other calculators</p>

      <ul className="list-disc pl-4">
        <li><a href="https://www.calculator.net/repayment-calculator.html">Calculator.net Repayment Calculator</a></li>
        <li><a href="https://www.calculator.net/loan-calculator.html">Calculator.net Loan Calculator</a></li>
        <li><a href="https://www.calculator.net/payment-calculator.html">Calculator.net Payment Calculator</a></li>
        <li><a href="https://www.loanmarket.com.au/calculators/loan-repayment-calculator">Loan Market</a></li>
        <li><a href="https://www.commbank.com.au/digital/home-buying/calculator/home-loan-repayments">CommBank</a></li>
        <li><a href="https://moneysmart.gov.au/budgeting/compound-interest-calculator">Moneysmart</a></li>
        <li><a href="https://www.aussie.com.au/calculators/mortgage-repayments/">Aussie Home Loans</a></li>
        <li><a href="https://www.walletwyse.com/calculators/home/">Walletwyse</a></li>
        <li><a href="https://www.suncorp.com.au/banking/home-loan-repayment-calculator.html">Suncorp</a></li>
        <li><a href="https://www.domain.com.au/home-loans/calculators/home-loan-repayment-calculator/">Domain</a></li>
        <li><a href="https://mystate.com.au/business/loan-repayment-calculator/">MyState</a></li>
      </ul>
    </div>
  );
};

export default App;
