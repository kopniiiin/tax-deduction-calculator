import './modal.scss';
import React, {FC, useEffect} from 'react';
import {Key} from '../../const';
import {formatClassName} from '../../utils';
import CloseButton from '../close-button/close-button';
import Calculator from '../calculator/calculator';

interface Props {
  mixClassName?: string;
  onClose: () => void;
}

const Modal: FC<Props> = ({
  mixClassName,
  onClose,
}: Props) => {
  const onKeydown = (event: KeyboardEvent): void => {
    if (event.key !== Key.ESCAPE) return;
    event.preventDefault();
    onClose();
  };

  useEffect((): (() => void) => {
    document.addEventListener('keydown', onKeydown);
    return (): void => document.removeEventListener('keydown', onKeydown);
  }, []);

  return (
    <div className={formatClassName(mixClassName || '', 'modal')}>

      <div className="modal__overlay" onClick={onClose}/>

      <section className="modal__dialog">

        <CloseButton mixClassName="modal__close-button" onClick={onClose}/>

        <h2 className="modal__heading">Налоговый вычет</h2>

        <p className="modal__text">
          Используйте налоговый вычет,
          чтобы погасить ипотеку досрочно.
          Размер налогового вычета составляет
          не более 13% от официального годового дохода.
        </p>

        <Calculator onSubmit={onClose}/>

      </section>

    </div>
  );
};

export default Modal;
