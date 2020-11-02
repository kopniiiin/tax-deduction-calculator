import './money-input.scss';
import React, {FC, useState, useEffect, useRef, ChangeEvent} from 'react';
import {nanoid} from 'nanoid';
import {MAX_MONEY_LENGTH} from '../../const';
import {formatClassName, formatMoney, checkIfDigitString} from '../../utils';

interface Props {
  mixClassName?: string;
  name: string;
  label: string;
  money: number;
  min: number;
  max: number;
  required: boolean;
  onBlur: (money: number) => void;
}

const MoneyInput: FC<Props> = ({
  mixClassName,
  name,
  label,
  money,
  min,
  max,
  required,
  onBlur,
}: Props) => {
  const [value, setValue] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [canShowMessage, setCanShowMessage] = useState<boolean>(false);
  const {current: id} = useRef<string>(nanoid());

  useEffect((): void => {
    if (!canShowMessage) return;
    const numValue: number = Number(value);
    if (!value) setErrorMessage(required ? 'Обязательное поле' : '');
    else if (numValue < min) setErrorMessage(`Минимум ${formatMoney(min)}`);
    else if (numValue > max) setErrorMessage(`Максимум ${formatMoney(max)}`);
    else setErrorMessage('');
  }, [value, canShowMessage]);

  const onInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newValue: string = event.target.value;
    if (!checkIfDigitString(newValue)) return;
    setValue(newValue);
    setCanShowMessage(true);
  };

  const onInputBlur = (): void => {
    const numValue: number = Number(value);
    if (value) setValue(String(numValue));
    setCanShowMessage(true);
    onBlur(numValue);
  };

  const className: string = formatClassName(
      mixClassName || '',
      'money-input',
      errorMessage ? 'money-input_invalid' : '',
  );

  return (
    <div className={className}>

      <label
        className="money-input__label"
        htmlFor={id}>
        {label}
      </label>

      <div className="money-input__container">

        <input
          className="money-input__input"
          id={id}
          type="text"
          name={name}
          value={value}
          pattern="[0-9]*"
          autoComplete="off"
          inputMode="numeric"
          maxLength={MAX_MONEY_LENGTH}
          placeholder={`От ${formatMoney(min)} до ${formatMoney(max)}`}
          required={required}
          onChange={onInputChange}
          onBlur={onInputBlur}/>

        {value && (
          <span className="money-input__cover">{formatMoney(money)}</span>
        )}

      </div>

      {errorMessage && (
        <span className="money-input__error-message">{errorMessage}</span>
      )}

    </div>
  );
};

export default MoneyInput;
