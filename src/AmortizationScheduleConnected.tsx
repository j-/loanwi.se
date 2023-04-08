import { FC } from 'react';
import AmortizationSchedule from './AmortizationSchedule';
import { useAppSelector } from './store';
import { selectAmortizationSchedule } from './store/reducer-root';

const AmortizationScheduleConnected: FC = () => {
  const schedule = useAppSelector(selectAmortizationSchedule);
  return <AmortizationSchedule schedule={schedule}  />;
};

export default AmortizationScheduleConnected;
