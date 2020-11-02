import '../../images/tick.svg';
import './payment-checkbox.scss';
import React, {FC, useRef} from 'react';
import {nanoid} from 'nanoid';
import {formatClassName, formatMoney} from '../../utils';

interface Props {
  mixClassName?: string;
  payment: number;
  number: number;
  checked: boolean;
  onNumberChange: (number: number) => void;
}

const PaymentCheckbox: FC<Props> = ({
  mixClassName,
  payment,
  number,
  checked,
  onNumberChange,
}: Props) => {
  const {current: id} = useRef<string>(nanoid());

  return (
    <div className={formatClassName(mixClassName || '', 'payment-checkbox')}>

      <input
        className="payment-checkbox__input"
        id={id}
        type="checkbox"
        name="payment-number"
        value={number}
        checked={checked}
        onChange={(): void => onNumberChange(number)}/>

      <label
        className="payment-checkbox__label"
        htmlFor={id}>
        <span>
          {formatMoney(payment)}{' '}
          <span className="payment-checkbox__number">в {number}-й год</span>
        </span>
      </label>

    </div>
  );
};

export default PaymentCheckbox;
