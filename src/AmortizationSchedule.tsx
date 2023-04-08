import { FC } from 'react';
import { TableVirtuoso } from 'react-virtuoso';
import { RepaymentSchedule } from './repayments';
import Dollars from './Dollars';

export type AmortizationScheduleProps = {
  schedule: RepaymentSchedule;
};

const AmortizationSchedule: FC<AmortizationScheduleProps> = ({ schedule }) => (
  <TableVirtuoso
    className="bg-white w-full h-full"
    data={schedule}
    fixedHeaderContent={() => (
      <tr>
        <th className="text-right bg-white px-2 border-b border-r-2 border-slate-200">
          Period
        </th>
        <th className="text-right bg-white px-2 border-b border-r-2 border-slate-200">
          Repayment amount
        </th>
        <th className="text-right bg-white px-2 border-b border-r-2 border-slate-200">
          Interest this payment
        </th>
        <th className="text-right bg-white px-2 border-b border-r-2 border-slate-200">
          Principal this payment
        </th>
        <th className="text-right bg-white px-2 border-b border-r-2 border-slate-200">
          Interest to date
        </th>
        <th className="text-right bg-white px-2 border-b border-r-2 border-slate-200">
          Unpaid principal balance
        </th>
        <th className="text-right bg-white px-2 border-b border-r-2 border-slate-200">
          Cost to date
        </th>
      </tr>
    )}
    itemContent={(index, payment) => (
      <>
        <td className="text-right px-2 border-b border-r-2 border-slate-200 tabular-nums">
          {payment.period}
        </td>
        <td className="text-right px-2 border-b border-r-2 border-slate-200 tabular-nums">
          {index === 0 ? <>-</> : <Dollars value={payment.repaymentAmount} />}
        </td>
        <td className="text-right px-2 border-b border-r-2 border-slate-200 tabular-nums">
          {index === 0 ? <>-</> : <Dollars value={payment.interestThisPayment} />}
        </td>
        <td className="text-right px-2 border-b border-r-2 border-slate-200 tabular-nums">
          {index === 0 ? <>-</> : <Dollars value={payment.principalThisPayment} />}
        </td>
        <td className="text-right px-2 border-b border-r-2 border-slate-200 tabular-nums">
          {index === 0 ? <>-</> : <Dollars value={payment.interestToDate} />}
        </td>
        <td className="text-right px-2 border-b border-r-2 border-slate-200 tabular-nums">
          <Dollars value={payment.unpaidPrincipalBalance} />
        </td>
        <td className="text-right px-2 border-b border-r-2 border-slate-200 tabular-nums">
          {index === 0 ? <>-</> : <Dollars value={payment.costToDate} />}
        </td>
      </>
    )}
  />
);

export default AmortizationSchedule;
