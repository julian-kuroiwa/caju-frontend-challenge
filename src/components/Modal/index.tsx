import { ReactNode, useEffect, useRef } from "react";
import { CgClose } from 'react-icons/cg';
import * as S from './styles';

type Props = {
  openModal: boolean
  closeModal: () => void
  children: ReactNode
}

const Modal = ({ openModal, closeModal, children }: Props) => {
  const dialog = useRef<HTMLDialogElement>();

  const clickOutsideModal = (event: MouseEvent) =>
    event.target === event.currentTarget && event.currentTarget?.close()

  useEffect(() => {
    dialog.current?.addEventListener('mousedown', clickOutsideModal);

    return () => {
      dialog.current?.removeEventListener('mousedown', clickOutsideModal);
    }
  }, [])

  useEffect(() => {
    if (openModal) {
      dialog.current?.showModal();
    } else {
      dialog.current?.close();
    }
  }, [openModal]);

  return (
    <S.Container ref={dialog} onCancel={closeModal}>
      <S.Close onClick={closeModal}>
        <CgClose />
      </S.Close>
      <S.Content>{children}</S.Content>
    </S.Container>
  );
};

export default Modal