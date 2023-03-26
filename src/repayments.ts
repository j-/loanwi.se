/**
 * Enum representing number of repayments in a term.
 * @example
 * RepaymentFrequency.WEEKLY; // 52
 */
export enum RepaymentFrequency {
  ANNUALLY = 1,
  MONTHLY = 12,
  FORTNIGHTLY = 26,
  WEEKLY = 52,
}

/**
 * Indexed by {@link RepaymentFrequency}. Used in e.g. "$xxx / Year";
 * @example
 * repaymentPerLabel[RepaymentFrequency.ANNUALLY]; // "Year"
 */
export const repaymentPerLabel = {
  [RepaymentFrequency.ANNUALLY]: 'Year',
  [RepaymentFrequency.MONTHLY]: 'Month',
  [RepaymentFrequency.FORTNIGHTLY]: 'Fortnight',
  [RepaymentFrequency.WEEKLY]: 'Week',
};

/** Represents a single loan repayment. */
export interface Repayment {
  /** This repayment number. */
  period: number;
  /** Amount paid each period. */
  repaymentAmount: number;
  /** Interest paid this period. */
  interestThisPayment: number;
  /** Principal paid this period. */
  principalThisPayment: number;
  /** Amount of interest paid so far. */
  interestToDate: number;
  /** Amount of principal remaining. */
  unpaidPrincipalBalance: number;
  /** Total amount of principal and interest paid so far. */
  costToDate: number;
}

/** All repayments for the lifetime of a loan. */
export interface RepaymentSchedule extends Array<Repayment> {
  /** The total number of repayments. */
  length: number;
}

/** These values are used for calculating the repayment schedule. */
export interface RepaymentScheduleBuilderArgs {
  /** Amount originally borrowed. */
  loanAmount: number;
  /** Amount paid each period. */
  repaymentAmount: number;
  /** Interest charged per period (as a ratio). */
  interestRatePeriodRatio: number;
  /** Total number of repayments for this loan. */
  numberOfRepayments: number;
}

/** Generates a repayment table given details about a loan. */
export interface RepaymentScheduleBuilder {
  (args: RepaymentScheduleBuilderArgs): RepaymentSchedule;
}

export const buildRepaymentSchedule: RepaymentScheduleBuilder = ({
  loanAmount,
  repaymentAmount,
  interestRatePeriodRatio,
  numberOfRepayments,
}) => {
  const payment0: Repayment = {
    period: 0,
    repaymentAmount: 0,
    interestThisPayment: 0,
    principalThisPayment: 0,
    interestToDate: 0,
    unpaidPrincipalBalance: loanAmount,
    costToDate: 0,
  };
  const paymentN: Repayment = {
    period: 0,
    repaymentAmount, // Fixed
    interestThisPayment: 0,
    principalThisPayment: 0,
    interestToDate: 0,
    unpaidPrincipalBalance: 0,
    costToDate: 0,
  };
  const table: RepaymentSchedule = [payment0];
  let lastPayment = payment0;
  for (let period = 1; period <= numberOfRepayments; period++) {
    const thisPayment: Repayment = Object.create(paymentN);
    thisPayment.period = period;
    thisPayment.repaymentAmount = repaymentAmount;
    thisPayment.interestThisPayment = lastPayment.unpaidPrincipalBalance * interestRatePeriodRatio;
    thisPayment.principalThisPayment = thisPayment.repaymentAmount - thisPayment.interestThisPayment;
    thisPayment.interestToDate = lastPayment.interestToDate + thisPayment.interestThisPayment;
    thisPayment.unpaidPrincipalBalance = Math.max(lastPayment.unpaidPrincipalBalance - thisPayment.principalThisPayment, 0);
    thisPayment.costToDate = lastPayment.costToDate + repaymentAmount;
    table.push(thisPayment);
    lastPayment = thisPayment;
  }
  return table;
};

export interface RepaymentAmountCalculatorArgs {
  /** Amount loaned in dollars. */
  loanPrincipal: number;
  /** Number of years in the repayment schedule. */
  loanTerm: number;
  /** Number of payments in a term. */
  repaymentFrequency: number;
  /** Amount of interest paid on the loan per term, 1 = 1%, 100 = 100%. */
  interestRate: number;
}

export interface RepaymentAmountCalculator {
  (args: RepaymentAmountCalculatorArgs): number;
}

export const calculateRepaymentAmount: RepaymentAmountCalculator = ({
  loanPrincipal,
  loanTerm,
  repaymentFrequency,
  interestRate,
}) => {
  const interestRateRatio = interestRate / 100;
  const interestRatePeriodRatio = interestRateRatio / repaymentFrequency;
  const numberOfRepayments = loanTerm * repaymentFrequency;

  return (
    (loanPrincipal * interestRatePeriodRatio) /
    (1 - ((1 + interestRatePeriodRatio) ** -numberOfRepayments))
  );
};
