import React from 'react';
import Dollars from './Dollars';

export type OutputTotalsChart = {
  loanPrincipal: number;
  totalInterestPaid: number;
  totalPayments: number;
};

const OutputTotalsChart: React.FC<OutputTotalsChart> = ({
  loanPrincipal,
  totalPayments,
}) => {
  const ratioPrincipal = loanPrincipal / totalPayments;
  const ratioInterest = 1 - ratioPrincipal;

  return (
    <div className="my-1 flex flex-col gap-3">
      <div className="h-4 rounded-full bg-gray-50">
        <div className="h-full rounded-full outline outline-blue-500 bg-blue-400" style={{ width: ratioPrincipal * 100 + '%' }} />
      </div>
      <div className="h-4 rounded-full bg-gray-50">
        <div className="h-full rounded-full outline outline-red-500 bg-red-400 ml-auto" style={{ width: ratioInterest * 100 + '%' }} />
      </div>
      <div className="h-4 rounded-full bg-gray-50">
        <div className="h-full rounded-full outline outline-purple-500 bg-purple-400" />
      </div>
    </div>
  );
};

export default OutputTotalsChart;
