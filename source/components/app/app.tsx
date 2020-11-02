import '../../fonts/labgrotesque-regular.woff';
import '../../fonts/labgrotesque-regular.woff2';
import '../../fonts/labgrotesque-medium.woff';
import '../../fonts/labgrotesque-medium.woff2';
import '../../styles/fonts.scss';
import './app.scss';
import React, {FC, useState} from 'react';
import {ButtonStyle, ButtonType} from '../../const';
import {formatClassName} from '../../utils';
import Button from '../button/button';
import Modal from '../modal/modal';

interface Props {
  mixClassName?: string;
}

const App: FC<Props> = ({
  mixClassName,
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const onButtonClick = (): void => setIsModalOpen(true);
  const onModalClose = (): void => setIsModalOpen(false);

  const className: string = formatClassName(
      mixClassName || '',
      'app',
      isModalOpen ? 'app_no-scroll' : '',
  );

  return (
    <main className={className}>

      <div className="app__container">

        <h1 className="app__heading">Калькулятор налогового вычета</h1>

        <Button
          style={ButtonStyle.OUTLINED}
          type={ButtonType.BUTTON}
          text="Налоговый вычет"
          disabled={isModalOpen}
          onClick={onButtonClick}/>

        {isModalOpen && <Modal onClose={onModalClose}/>}

      </div>

    </main>
  );
};

export default App;
