import React, { useCallback } from 'react';
import InputCurrency from './InputCurrency';
import InputPrincipal from './InputPrincipal';
import InputRate from './InputRate';
import InputTerm from './InputTerm';
import InputFrequency from './InputFrequency';
import OutputRepaymentAmountsConnected from './OutputRepaymentAmountsConnected';
import OutputTotalsTableConnected from './OutputTotalsTableConnected';
import AmortizationSchedule from './AmortizationScheduleConnected';

const App: React.FC = () => {
  const handleSubmitForm = useCallback<React.FormEventHandler>((e) => {
    e.preventDefault();
  }, []);

  return (
    <div className="App container mt-10 mb-20">
      <div className="mt-10 mb-2 flex flex-row gap-6">
        <div className="flex-1 sm:flex-[2]">
          <a href="https://loanwi.se" className="inline-flex flex-col sm:flex-row h-full sm:items-end gap-2 sm:gap-4 hover:bg-gray-50 rounded-lg p-4">
            <img src="/icon.svg" alt="Coin icon" width={40} height={40} className="w-8 sm:w-10 md:w-12" draggable={false} />
            <h1 className="text-2xl sm:text-3xl md:text-5xl inline">
              Loan Wise
            </h1>{' '}
            <span className="text-lg sm:text-xl md:text-3xl text-gray-700">
              (loanwi.se)
            </span>
          </a>
        </div>
        <div className="flex-1 flex flex-col justify-end">
          <div className="p-4">
            <InputCurrency />
          </div>
        </div>
      </div>

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
          </div>
        </div>
      </form>

      <div className="my-6 flex flex-col sm:flex-1 gap-2 p-4 bg-slate-100 rounded-md h-96">
        <AmortizationSchedule />
      </div>
    </div>
  );
};

export default App;
