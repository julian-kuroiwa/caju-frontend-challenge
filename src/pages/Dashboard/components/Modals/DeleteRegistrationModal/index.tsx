import Button from '~/components/Buttons';
import Modal from '~/components/Modal';
import {
  Registration
} from '~/types/registration';
import * as S from '../styles';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  handleDeleteConfirmation: () => void;
  currentRegistration: Registration;
};

const DeleteRegistrationModal = ({
  isOpen,
  onClose,
  handleDeleteConfirmation,
  currentRegistration,
}: Props) => {
  return (
    <Modal openModal={isOpen} closeModal={onClose}>
      <S.Header>
        <S.Title>Remover registro</S.Title>
      </S.Header>
      <S.Content>
        <S.Text>
          Você está removendo o registro de{' '}
          <strong>{currentRegistration?.employeeName}</strong> do board.
        </S.Text>
      </S.Content>
      <S.Footer>
        <Button type="button" onClick={handleDeleteConfirmation}>
          Confirmar
        </Button>
      </S.Footer>
    </Modal>
  );
};

export default DeleteRegistrationModal;
