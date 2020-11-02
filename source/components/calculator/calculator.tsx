import './calculator.scss';
import React, {FC, useState, useEffect, useRef, FormEvent} from 'react';
import {nanoid} from 'nanoid';

import {
  PriceLimit,
  SalaryLimit,
  TaxDeductionTarget,
  ButtonStyle,
  ButtonType,
} from '../../const';

import {
  doNothing,
  formatClassName,
  checkIfPriceAndSalaryAreValid,
  calculatePayments,
} from '../../utils';

import Button from '../button/button';
import TextButton from '../text-button/text-button';
import MoneyInput from '../money-input/money-input';
import TargetRadio from '../target-radio/target-radio';
import PaymentCheckbox from '../payment-checkbox/payment-checkbox';

interface Props {
  mixClassName?: string;
  onSubmit: () => void;
}

const Calculator: FC<Props> = ({
  mixClassName,
  onSubmit,
}: Props) => {
  const [price, setPrice] = useState<number>(0);
  const [salary, setSalary] = useState<number>(0);
  const [payments, setPayments] = useState<number[]>([]);
  const [lastPaymentNumber, setLastPaymentNumber] = useState<number>(0);
  const {current: paymentLegendID} = useRef<string>(nanoid());
  const {current: targetLegendID} = useRef<string>(nanoid());

  const [
    target,
    setTarget,
  ] = useState<TaxDeductionTarget>(TaxDeductionTarget.PAYMENT);

  const [
    isCalculateButtonDisabled,
    setIsCalculateButtonDisabled,
  ] = useState<boolean>(true);

  useEffect((): void => {
    setIsCalculateButtonDisabled(!checkIfPriceAndSalaryAreValid(price, salary));
  }, [price, salary]);

  const onCalculateButtonClick = (): void => {
    setPayments(calculatePayments(price, salary));
    setLastPaymentNumber(0);
    setIsCalculateButtonDisabled(true);
  };

  const onPaymentNumberChange = (number: number): void => setLastPaymentNumber(
    number === lastPaymentNumber ? lastPaymentNumber - 1 : number,
  );

  const onFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form
      className={formatClassName(mixClassName || '', 'calculator')}
      onSubmit={onFormSubmit}>

      <div className="calculator__inputs">

        <MoneyInput
          name="price"
          label="Стоимость квартиры"
          money={price}
          min={PriceLimit.MIN}
          max={PriceLimit.MAX}
          required={true}
          onBlur={setPrice}/>

        <MoneyInput
          name="salary"
          label="Месячная зарплата"
          money={salary}
          min={SalaryLimit.MIN}
          max={SalaryLimit.MAX}
          required={true}
          onBlur={setSalary}/>

        <TextButton
          mixClassName="calculator__calculate-button"
          text="Рассчитать"
          disabled={isCalculateButtonDisabled}
          onClick={onCalculateButtonClick}/>

        {payments.length > 0 && (
          <div
            className="calculator__fieldset"
            role="group"
            aria-labelledby={paymentLegendID}>

            <span
              className="calculator__legend"
              id={paymentLegendID}>
              Досрочные платежи:
            </span>

            <ol className="calculator__payments">
              {payments.map((payment: number, index: number): JSX.Element => {
                const number: number = index + 1;

                return (
                  <li key={number} className="calculator__payment">
                    <PaymentCheckbox
                      payment={payment}
                      number={number}
                      checked={number <= lastPaymentNumber}
                      onNumberChange={onPaymentNumberChange}/>
                  </li>
                );
              })}
            </ol>

          </div>
        )}

        <div
          className="calculator__fieldset calculator__fieldset_targets"
          role="group"
          aria-labelledby={targetLegendID}>

          <span
            className="calculator__legend"
            id={targetLegendID}>
            Что уменьшаем?
          </span>

          <div>

            <TargetRadio
              mixClassName="calculator__target"
              target={TaxDeductionTarget.PAYMENT}
              checked={target === TaxDeductionTarget.PAYMENT}
              onChange={setTarget}/>

            <TargetRadio
              mixClassName="calculator__target"
              target={TaxDeductionTarget.TERM}
              checked={target === TaxDeductionTarget.TERM}
              onChange={setTarget}/>

          </div>

        </div>

      </div>

      <Button
        style={ButtonStyle.CONTAINED}
        type={ButtonType.SUBMIT}
        text="Добавить"
        disabled={lastPaymentNumber === 0}
        onClick={doNothing}/>

    </form>
  );
};

export default Calculator;
