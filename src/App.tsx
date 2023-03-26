import React, { useCallback, useMemo, useState } from 'react';
import useSessionStorageState from 'use-session-storage-state';
import NumberFormat, { NumberFormatPropsBase } from 'react-number-format';
import { calculateRepaymentAmount, RepaymentFrequency } from './repayments';
import RepaymentAmountsOutput from './RepaymentAmountsOutput';
import Dollars, { symbol } from './Dollars';

const DEFAULT_DEPOSIT_RATIO = 0.2;
const DEFAULT_LOAN_PRINCIPAL = 30000;
const DEFAULT_INTEREST_RATE_PERCENT = 15.9;
const DEFAULT_LOAN_TERM = 7;

enum Field {
  LOAN_PRINCIPAL = 'principal',
  INTEREST_RATE = 'rate',
  LOAN_TERM = 'term',
  DEPOSIT_PERCENT = 'deposit',
};

const App: React.FC = () => {
  const [loanPrincipalNumber, setLoanPrincipalNumber] = useSessionStorageState(
    Field.LOAN_PRINCIPAL,
    { defaultValue: DEFAULT_LOAN_PRINCIPAL }
  );

  const [interestRatePercent, setInterestRatePercent] = useSessionStorageState(
    Field.INTEREST_RATE,
    { defaultValue: DEFAULT_INTEREST_RATE_PERCENT }
  );

  const [loanTerm, setLoanTerm] = useSessionStorageState(
    Field.LOAN_TERM,
    { defaultValue: DEFAULT_LOAN_TERM }
  );

  const [depositPercent, setDepositPercent] = useState(DEFAULT_DEPOSIT_RATIO * 100);
  const depositAmount = Math.round(depositPercent / 100 * loanPrincipalNumber);

  const isValid = useMemo(() => (
    !isNaN(loanPrincipalNumber) && loanPrincipalNumber > 0 &&
    !isNaN(interestRatePercent) && interestRatePercent > 0 &&
    !isNaN(loanTerm) && loanTerm > 0
  ), [interestRatePercent, loanPrincipalNumber, loanTerm]);

  const monthlyRepaymentAmount = useMemo(() => {
    return calculateRepaymentAmount({
      loanPrincipal: loanPrincipalNumber,
      interestRate: interestRatePercent,
      loanTerm,
      repaymentFrequency: RepaymentFrequency.MONTHLY,
    });
  }, [loanPrincipalNumber, interestRatePercent, loanTerm]);

  const annualRepaymentAmount = useMemo(() => {
    return calculateRepaymentAmount({
      loanPrincipal: loanPrincipalNumber,
      interestRate: interestRatePercent,
      loanTerm,
      repaymentFrequency: RepaymentFrequency.ANNUALLY,
    });
  }, [loanPrincipalNumber, interestRatePercent, loanTerm]);

  const fortnightlyRepaymentAmount = useMemo(() => {
    return calculateRepaymentAmount({
      loanPrincipal: loanPrincipalNumber,
      interestRate: interestRatePercent,
      loanTerm,
      repaymentFrequency: RepaymentFrequency.FORTNIGHTLY,
    });
  }, [loanPrincipalNumber, interestRatePercent, loanTerm]);

  const weeklyRepaymentAmount = useMemo(() => {
    return calculateRepaymentAmount({
      loanPrincipal: loanPrincipalNumber,
      interestRate: interestRatePercent,
      loanTerm,
      repaymentFrequency: RepaymentFrequency.WEEKLY,
    });
  }, [loanPrincipalNumber, interestRatePercent, loanTerm]);

  const handleValueChange = useCallback<NonNullable<NumberFormatPropsBase<unknown>['onValueChange']>>((values) => {
    setLoanPrincipalNumber(values.floatValue || 0);
  }, [setLoanPrincipalNumber]);

  const handleChangeInterestRate = useCallback<React.ChangeEventHandler<HTMLInputElement>>((e) => {
    setInterestRatePercent(e.currentTarget.valueAsNumber);
  }, [setInterestRatePercent]);

  const handleChangeLoanTerm = useCallback<React.ChangeEventHandler<HTMLInputElement>>((e) => {
    setLoanTerm(e.currentTarget.valueAsNumber);
  }, [setLoanTerm]);

  const handleChangeDepositAmountPercent = useCallback<React.ChangeEventHandler<HTMLInputElement>>((e) => {
    setDepositPercent(e.currentTarget.valueAsNumber);
  }, []);

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
    return totalPayments - loanPrincipalNumber;
  }, [loanPrincipalNumber, totalPayments]);

  const loanAmountInput = (
    <div className="flex-1">
      <label htmlFor="App-loan-amount" className="text-grey-darker inline-block mb-2">Loan amount</label><br />
      <div className="flex flex-wrap items-stretch w-full mb-4 relative">
        <div className="flex -mr-px">
          <span className="flex items-center leading-normal bg-grey-lighter rounded rounded-r-none border border-r-0 border-grey-light px-3 whitespace-no-wrap text-grey-dark text-sm">{symbol}</span>
        </div>
        <NumberFormat
          id="App-loan-amount"
          name={Field.LOAN_PRINCIPAL}
          className="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border h-10 h-16 text-lg border-grey-light rounded rounded-l-none px-3 relative focus:border-blue focus:shadow"
          value={loanPrincipalNumber}
          onValueChange={handleValueChange}
          thousandSeparator=" "
          inputMode="numeric"
          min={0}
          max={999999999}
        />
      </div>
    </div>
  );

  const interestRateInput = (
    <div className="flex-1">
      <label htmlFor="App-interest-rate">Interest rate</label><br />
      <div className="flex flex-wrap items-stretch w-full mb-4 relative">
        <input
          id="App-interest-rate"
          name={Field.INTEREST_RATE}
          className="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border h-10 h-12 border-grey-light rounded rounded-r-none px-3 relative"
          type="number"
          value={interestRatePercent}
          onChange={handleChangeInterestRate}
          inputMode="numeric"
          min={0}
          max={100}
          step={0.1}
        />
        <div className="flex -mr-px">
          <span className="flex items-center leading-normal bg-grey-lighter rounded rounded-l-none border border-l-0 border-grey-light px-3 whitespace-no-wrap text-grey-dark text-sm">%</span>
        </div>
      </div>
    </div>
  );

  const loanTermInput = (
    <div className="flex-1">
      <label htmlFor="App-loan-term">Loan term</label><br />
      <div className="flex flex-wrap items-stretch w-full mb-4 relative">
        <input
          id="App-loan-term"
          name={Field.LOAN_TERM}
          className="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border h-10 h-12 border-grey-light rounded rounded-r-none px-3 relative"
          type="number"
          value={loanTerm}
          onChange={handleChangeLoanTerm}
          inputMode="numeric"
          min={1}
          max={100}
          step={1}
        />
        <div className="flex -mr-px">
          <span className="flex items-center leading-normal bg-grey-lighter rounded rounded-l-none border border-l-0 border-grey-light px-3 whitespace-no-wrap text-grey-dark text-sm">years</span>
        </div>
      </div>
    </div>
  );

  const depositAmountPercentInput = (
    <div className="flex-1">
      <label htmlFor="App-deposit-amount-percent">Deposit amount (%)</label><br />
      <div className="flex flex-wrap items-stretch w-full mb-4 relative">
        <input
          id="App-deposit-amount-percent"
          type="number"
          className="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border h-10 border-grey-light rounded rounded-r-none px-3 relative"
          value={depositPercent}
          onChange={handleChangeDepositAmountPercent}
          min={0}
          max={100}
          step={5}
        />
        <div className="flex -mr-px">
          <span className="flex items-center leading-normal bg-grey-lighter rounded rounded-l-none border border-l-0 border-grey-light px-3 whitespace-no-wrap text-grey-dark text-sm">%</span>
        </div>
      </div>
    </div>
  );

  const depositAmountDollarsInput = (
    <div className="flex-1">
      <label htmlFor="App-deposit-amount-dollars">Deposit amount ($)</label><br />
      <div className="flex flex-wrap items-stretch w-full mb-4 relative">
        <div className="flex">
          <span className="flex items-center leading-normal bg-grey-lighter rounded border border-grey-light px-3 whitespace-no-wrap text-grey-dark text-sm">$</span>
        </div>
        <NumberFormat
          id="App-deposit-amount-dollars"
          className="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 h-10 rounded rounded-l-none px-3 relative"
          value={depositAmount}
          thousandSeparator=" "
          inputMode="numeric"
          readOnly
        />
      </div>
    </div>
  );

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
            {loanAmountInput}
            <div className="flex gap-2">
              {interestRateInput}
              {loanTermInput}
            </div>
            {repaymentFrequencyInput}
            <p><Dollars value={loanPrincipalNumber} round /> principal</p>
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
        <section hidden>
          <h2 className="text-xl my-6">Deposit Calculator</h2>
          <div className="flex gap-2 sm:gap-8">
            {depositAmountPercentInput}
            {depositAmountDollarsInput}
          </div>
        </section>
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
