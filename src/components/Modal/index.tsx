import { ReactNode, useRef } from 'react';
import { CgClose } from 'react-icons/cg';
import * as S from './styles';

type Props = {
  openModal: boolean;
  closeModal: () => void;
  children: ReactNode;
};

const Modal = ({ openModal, closeModal, children }: Props) => {
  const backdrop = useRef<HTMLElement>(null);

  // useEffect(() => {
  //   if (openModal) {
  //     document.addEventListener('mousedown', handleClickOutside);
  //   }

  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [openModal]);

  if (openModal) {
    return (
      <S.Backdrop ref={backdrop}>
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
