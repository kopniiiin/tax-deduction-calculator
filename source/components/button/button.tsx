import './button.scss';
import React, {FC} from 'react';
import {ButtonStyle, ButtonType} from '../../const';
import {formatClassName} from '../../utils';

interface Props {
  mixClassName?: string;
  style: ButtonStyle;
  type: ButtonType;
  text: string;
  disabled: boolean;
  onClick: () => void;
}

const Button: FC<Props> = ({
  mixClassName,
  style,
  type,
  text,
  disabled,
  onClick,
}: Props) => {
  const className: string = formatClassName(
      mixClassName || '',
      'button',
      style === ButtonStyle.OUTLINED ? 'button_outlined' : '',
  );

  return (
    <button
      className={className}
      type={type}
      disabled={disabled}
      onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
