import './target-radio.scss';
import React, {FC, useRef} from 'react';
import {nanoid} from 'nanoid';
import {TaxDeductionTarget} from '../../const';
import {formatClassName} from '../../utils';

interface Props {
  mixClassName?: string;
  target: TaxDeductionTarget;
  checked: boolean;
  onChange: (target: TaxDeductionTarget) => void;
}

const TargetRadio: FC<Props> = ({
  mixClassName,
  target,
  checked,
  onChange,
}: Props) => {
  const {current: id} = useRef<string>(nanoid());

  return (
    <div className={formatClassName(mixClassName || '', 'target-radio')}>

      <input
        className="target-radio__input"
        id={id}
        type="radio"
        name="target"
        value={target}
        checked={checked}
        onChange={(): void => onChange(target)}/>

      <label
        className="target-radio__label"
        htmlFor={id}>
        {target === TaxDeductionTarget.PAYMENT ? 'Платёж' : 'Срок'}
      </label>

    </div>
  );
};

export default TargetRadio;
