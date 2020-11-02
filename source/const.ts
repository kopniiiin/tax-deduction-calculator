export const TAX_DEDUCTION_PERCENTAGE: number = 0.13;
export const MAX_TAX_DEDUCTION: number = 260000;
export const MONTHS_PER_YEAR: number = 12;
export const MAX_MONEY_LENGTH: number = 10;
export const MONEY_CHUNK_LENGTH: number = 3;

export enum PriceLimit {
  MIN = 100000,
  MAX = 10000000,
}

export enum SalaryLimit {
  MIN = 10000,
  MAX = 400000,
}

export enum TaxDeductionTarget {
  PAYMENT = 'payment',
  TERM = 'term',
}

export enum Key {
  ESCAPE = 'Escape',
}

export enum ButtonStyle {
  CONTAINED = 'contained',
  OUTLINED = 'outlined',
}

export enum ButtonType {
  BUTTON = 'button',
  SUBMIT = 'submit',
}
