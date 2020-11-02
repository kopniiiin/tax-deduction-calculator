import {
  TAX_DEDUCTION_PERCENTAGE,
  MAX_TAX_DEDUCTION,
  MONTHS_PER_YEAR,
  MONEY_CHUNK_LENGTH,
  PriceLimit,
  SalaryLimit,
} from './const';

export const doNothing = (): void => {};

export const formatClassName = (...classNames: string[]): string => {
  return classNames.join(' ').trim();
};

export const reverseString = (string: string): string => {
  return string.split('').reverse().join('');
};

export const splitStringIntoChunks = (
    string: string,
    chunkLength: number,
): string[] => {
  return string.match(new RegExp(`.{1,${chunkLength}}`, 'g')) || [];
};

export const formatMoney = (money: number): string => {
  const reversedString = reverseString(String(money));
  const chunks = splitStringIntoChunks(reversedString, MONEY_CHUNK_LENGTH);
  return `${reverseString(chunks.join(' '))} ₽`;
};

export const extractDigitsFromString = (string: string): string => {
  return (string.match(/\d/g) || []).join('');
};

export const checkIfDigitString = (string: string): boolean => {
  return string === extractDigitsFromString(string);
};

export const checkIfPriceAndSalaryAreValid = (
    price: number,
    salary: number,
): boolean => {
  return (
    price >= PriceLimit.MIN && price <= PriceLimit.MAX &&
    salary >= SalaryLimit.MIN && salary <= SalaryLimit.MAX
  );
};

export const calculatePayments = (price: number, salary: number): number[] => {
  const taxDeduction: number = Math.floor(Math.min(
      price * TAX_DEDUCTION_PERCENTAGE,
      MAX_TAX_DEDUCTION,
  ));

  const payment: number = Math.floor(
      salary * MONTHS_PER_YEAR * TAX_DEDUCTION_PERCENTAGE,
  );

  const fullPaymentAmount: number = Math.floor(taxDeduction / payment);
  const residualPayment: number = taxDeduction % payment;
  const payments: number[] = new Array(fullPaymentAmount).fill(payment);
  if (residualPayment) payments.push(residualPayment);
  return payments;
};
