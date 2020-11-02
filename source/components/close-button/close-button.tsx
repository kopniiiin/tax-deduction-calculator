import './close-button.scss';
import React, {FC} from 'react';
import {formatClassName} from '../../utils';

interface Props {
  mixClassName?: string;
  onClick: () => void;
}

const CloseButton: FC<Props> = ({
  mixClassName,
  onClick,
}: Props) => (
  <button
    className={formatClassName(mixClassName || '', 'close-button')}
    type="button"
    aria-label="Закрыть"
    onClick={onClick}/>
);

export default CloseButton;
