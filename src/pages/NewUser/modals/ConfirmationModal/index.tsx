import Button from '~/components/Buttons';
import Modal from '~/components/Modal';
import * as S from '~/pages/modalStyles';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  handleConfirmation: () => void;
};

const ConfirmationModal = ({
  isOpen,
  onClose,
  handleConfirmation,
}: Props) => {
  return (
    <Modal openModal={isOpen} closeModal={onClose}>
      <S.Header>
        <S.Title>Cadastrar nova admissão</S.Title>
      </S.Header>
      <S.Content>
        <S.Text>Você irá cadastrar uma nova admissão</S.Text>
      </S.Content>
      <S.Footer>
        <Button type="button" onClick={handleConfirmation}>
          Confirmar
        </Button>
      </S.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
