import { ReactNode } from 'react';
import { CgClose } from 'react-icons/cg';
import * as S from './styles';

type Props = {
  openModal: boolean;
  closeModal: () => void;
  children: ReactNode;
};

const Modal = ({ openModal, closeModal, children }: Props) => {
  if (openModal) {
    return (
      <S.Backdrop>
        <S.Container>
          <S.Close onClick={closeModal}>
            <CgClose />
          </S.Close>
          <S.Content>{children}</S.Content>
        </S.Container>
      </S.Backdrop>
    );
  }
};

export default Modal;
