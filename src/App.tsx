import React, { useCallback, useMemo, useState } from 'react';
import { calculateRepaymentAmount, RepaymentFrequency } from './repayments';
import RepaymentAmountsOutput from './RepaymentAmountsOutput';
import Dollars from './Dollars';
import { usePrincipal } from './use-principal';
import { useRate } from './use-rate';
import { useTerm } from './use-term';
import { useAppSelector } from './store';
import { selectInputsValid } from './store/reducer-root';
import InputPrincipal from './InputPrincipal';
import InputRate from './InputRate';
import InputTerm from './InputTerm';

const App: React.FC = () => {
  const [loanPrincipal] = usePrincipal();
  const [interestRatePercent] = useRate();
  const [loanTerm] = useTerm();

  const isValid = useAppSelector(selectInputsValid);

  const monthlyRepaymentAmount = useMemo(() => {
    return calculateRepaymentAmount({
      loanPrincipal: loanPrincipal,
      interestRate: interestRatePercent,
      loanTerm,
      repaymentFrequency: RepaymentFrequency.MONTHLY,
    });
  }, [loanPrincipal, interestRatePercent, loanTerm]);

  const annualRepaymentAmount = useMemo(() => {
    return calculateRepaymentAmount({
      loanPrincipal: loanPrincipal,
      interestRate: interestRatePercent,
      loanTerm,
      repaymentFrequency: RepaymentFrequency.ANNUALLY,
    });
  }, [loanPrincipal, interestRatePercent, loanTerm]);

  const fortnightlyRepaymentAmount = useMemo(() => {
    return calculateRepaymentAmount({
      loanPrincipal: loanPrincipal,
      interestRate: interestRatePercent,
      loanTerm,
      repaymentFrequency: RepaymentFrequency.FORTNIGHTLY,
    });
  }, [loanPrincipal, interestRatePercent, loanTerm]);

  const weeklyRepaymentAmount = useMemo(() => {
    return calculateRepaymentAmount({
      loanPrincipal: loanPrincipal,
      interestRate: interestRatePercent,
      loanTerm,
      repaymentFrequency: RepaymentFrequency.WEEKLY,
    });
  }, [loanPrincipal, interestRatePercent, loanTerm]);

  const handleSubmitForm = useCallback<React.FormEventHandler>((e) => {
    e.preventDefault();
  }, []);

  const [repaymentFrequency, setRepaymentFrequency] = useState(RepaymentFrequency.MONTHLY);

  const handleChangeRepaymentFrequency = useCallback<React.ChangeEventHandler<HTMLSelectElement>>((e) => {
    setRepaymentFrequency(
      Number(e.currentTarget.value) as RepaymentFrequency
    );
  }, []);

  const totalPayments = useMemo(() => {
    switch (repaymentFrequency) {
      case RepaymentFrequency.ANNUALLY:
        return annualRepaymentAmount * loanTerm;
      case RepaymentFrequency.MONTHLY:
        return monthlyRepaymentAmount * RepaymentFrequency.MONTHLY * loanTerm;
      case RepaymentFrequency.FORTNIGHTLY:
        return fortnightlyRepaymentAmount * RepaymentFrequency.FORTNIGHTLY * loanTerm;
      case RepaymentFrequency.WEEKLY:
        return weeklyRepaymentAmount * RepaymentFrequency.WEEKLY * loanTerm;
    }
  }, [
    annualRepaymentAmount,
    fortnightlyRepaymentAmount,
    loanTerm,
    monthlyRepaymentAmount,
    repaymentFrequency,
    weeklyRepaymentAmount,
  ]);

  const totalInterestPaid = useMemo(() => {
    return totalPayments - loanPrincipal;
  }, [loanPrincipal, totalPayments]);

  const repaymentFrequencyInput = (
    <div className="flex-1">
      <label htmlFor="App-repayment-frequency">Repayment frequency</label><br />
      <div className="flex flex-wrap items-stretch w-full mb-4 relative">
        <select
          id="App-repayment-frequency"
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
            {repaymentFrequencyInput}
            <p><Dollars value={loanPrincipal} round /> principal</p>
            <p><Dollars value={totalInterestPaid} round /> total interest paid</p>
            <p><Dollars value={totalPayments} round /> total payments</p>
          </div>
          <div className="sm:flex-1">
            {isValid && (
              <RepaymentAmountsOutput
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
