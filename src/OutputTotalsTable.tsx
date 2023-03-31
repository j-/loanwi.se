import React from 'react';
import Dollars from './Dollars';

export type OutputTotalsTableProps = {
  loanPrincipal: number;
  totalInterestPaid: number;
  totalPayments: number;
};

const OutputTotalsTable: React.FC<OutputTotalsTableProps> = ({
  loanPrincipal,
  totalInterestPaid,
  totalPayments,
}) => {
  const ratioPrincipal = loanPrincipal / totalPayments;
  const ratioInterest = 1 - ratioPrincipal;

  return (
    <table className="w-full">
      <tbody>
        <tr>
          <td className="w-1/4">Principal</td>
          <td className="w-1/4 px-2 text-end tabular-nums"><Dollars value={loanPrincipal} /></td>
          <td className="w-1/2 px-2">
            <div className="h-4 rounded-full bg-gray-50">
              <div className="h-full rounded-full outline outline-blue-400 bg-blue-300" style={{ width: ratioPrincipal * 100 + '%' }} />
            </div>
          </td>
        </tr>
        <tr>
          <td>Interest</td>
          <td className="px-2 text-end tabular-nums"><Dollars value={totalInterestPaid} /></td>
          <td className="px-2">
            <div className="h-4 rounded-full bg-gray-50">
              <div className="h-full rounded-full outline outline-red-400 bg-red-300" style={{ width: ratioInterest * 100 + '%' }} />
            </div>
          </td>
        </tr>
        <tr>
          <td>Total payments</td>
          <td
            className="px-2 text-end tabular-nums"
            style={{
              borderTop: '1px solid #000',
              borderBottom: '3px double #000',
            }}
          >
            <Dollars value={totalPayments} />
          </td>
          <td className="px-2">
            <div className="h-4 rounded-full bg-gray-50">
              <div className="h-full rounded-full outline outline-purple-400 bg-purple-300" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default OutputTotalsTable;
