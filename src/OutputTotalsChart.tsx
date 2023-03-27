import React from 'react';

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
        <div className="h-full rounded-full outline outline-blue-400 bg-blue-300" style={{ width: ratioPrincipal * 100 + '%' }} />
      </div>
      <div className="h-4 rounded-full bg-gray-50">
        <div className="h-full rounded-full outline outline-red-400 bg-red-300" style={{ width: ratioInterest * 100 + '%' }} />
      </div>
      <div className="h-4 rounded-full bg-gray-50">
        <div className="h-full rounded-full outline outline-purple-400 bg-purple-300" />
      </div>
    </div>
  );
};

export default OutputTotalsChart;
