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
}) => (
  <table className="w-full">
    <tbody>
      <tr>
        <td>Principal</td>
        <td className="text-end tabular-nums"><Dollars value={loanPrincipal} round /></td>
      </tr>
      <tr>
        <td>Interest</td>
        <td className="text-end tabular-nums"><Dollars value={totalInterestPaid} round /></td>
      </tr>
      <tr>
        <td>Total payments</td>
        <td
          className="text-end tabular-nums"
          style={{
            borderTop: '1px solid #000',
            borderBottom: '3px double #000',
          }}
        >
          <Dollars value={totalPayments} round />
        </td>
      </tr>
    </tbody>
  </table>
);

export default OutputTotalsTable;
