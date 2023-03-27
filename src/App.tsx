import React, { useCallback } from 'react';
import InputPrincipal from './InputPrincipal';
import InputRate from './InputRate';
import InputTerm from './InputTerm';
import InputFrequency from './InputFrequency';
import OutputRepaymentAmountsConnected from './OutputRepaymentAmountsConnected';
import OutputTotalsTableConnected from './OutputTotalsTableConnected';
import OutputTotalsChartConnected from './OutputTotalsChartConnected';

const App: React.FC = () => {
  const handleSubmitForm = useCallback<React.FormEventHandler>((e) => {
    e.preventDefault();
  }, []);

  return (
    <div className="App container my-10">
      <h1 className="text-3xl my-10">Loan Wise (loanwi.se)</h1>
      <form onSubmit={handleSubmitForm}>
        <div className="my-6 flex flex-col sm:flex-row gap-6">
          <div className="flex flex-col sm:flex-1 gap-2 p-4 bg-slate-100 rounded-md">
            <InputPrincipal />
            <div className="flex gap-2">
              <InputRate />
              <InputTerm />
            </div>
          </div>
          <div className="sm:flex-1">
            <OutputRepaymentAmountsConnected />
          </div>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row sm:flex-1 gap-4 p-4 bg-slate-100 rounded-md">
          <div className="flex-1">
            <InputFrequency />
          </div>
          <div className="flex-[2] flex flex-row gap-4">
            <div className="flex-1">
              <OutputTotalsTableConnected />
            </div>
            <div className="flex-1">
              <OutputTotalsChartConnected />
            </div>
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
