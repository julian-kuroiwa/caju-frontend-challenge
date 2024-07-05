import Button from '~/components/Buttons';
import Modal from '~/components/Modal';
import * as S from '~/pages/modalStyles';
import {
  Registration,
  StatusTranslation,
  StatusType,
} from '~/types/registration';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  handleStatusChangeConfirmation: () => void;
  currentRegistration: Registration;
  newStatus: keyof typeof StatusType;
};

const ChangeStatusModal = ({
  isOpen,
  onClose,
  handleStatusChangeConfirmation,
  currentRegistration,
  newStatus,
}: Props) => {
  return (
    <Modal
      openModal={isOpen}
      closeModal={onClose}
      data-testid="change-status-modal">
      <S.Header>
        <S.Title>Alterar status</S.Title>
      </S.Header>
      <S.Content>
        <S.Text>
          Você está alterando o status de{' '}
          <strong>{currentRegistration?.employeeName}</strong> de{' '}
          <strong>{StatusTranslation[currentRegistration?.status]}</strong> para{' '}
          <strong>{StatusTranslation[newStatus]}</strong>.
        </S.Text>
      </S.Content>
      <S.Footer>
        <Button type="button" onClick={handleStatusChangeConfirmation}>
          Confirmar
        </Button>
      </S.Footer>
    </Modal>
  );
};

export default ChangeStatusModal;
