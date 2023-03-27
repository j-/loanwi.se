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
      <h1 className="text-5xl mt-10 mb-4">
        <a href="https://loanwi.se">Loan Wise</a>
      </h1>
      <h2 className="text-3xl mt-4 mb-10 text-gray-700">
        <a href="https://loanwi.se">loanwi.se</a>
      </h2>

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
    </div>
  );
};

export default App;
