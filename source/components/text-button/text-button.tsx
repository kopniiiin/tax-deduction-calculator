import './text-button.scss';
import React, {FC} from 'react';
import {formatClassName} from '../../utils';

interface Props {
  mixClassName?: string;
  text: string;
  disabled: boolean;
  onClick: () => void;
}

const TextButton: FC<Props> = ({
  mixClassName,
  text,
  disabled,
  onClick,
}: Props) => (
  <button
    className={formatClassName(mixClassName || '', 'text-button')}
    type="button"
    disabled={disabled}
    onClick={onClick}>
    {text}
  </button>
);

export default TextButton;
