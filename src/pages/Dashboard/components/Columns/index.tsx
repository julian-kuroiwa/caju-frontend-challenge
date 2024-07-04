import { useState } from 'react';
import { useRegistrationContext } from '~/contexts/RegistrationsContext';
import { Registration } from '~/types/registration';
import { columns } from '../../constants';
import ChangeStatusModal from '../Modals/ChangeStatusModal';
import DeleteRegistrationModal from '../Modals/DeleteRegistrationModal';
import RegistrationCard from '../RegistrationCard';
import * as S from './styles';

type Props = {
  registrations?: Registration[];
};

const Collumns = ({ registrations }: Props) => {
  const [changeStatusModalIsOpen, setChangeStatusModalIsOpen] = useState(false);
  const [deleteRegistrationModalIsOpen, setDeleteRegistrationModalIsOpen] =
    useState(false);
  const {
    handleStatus,
    handleRemove,
    currentRegistration,
    registrationNewStatus,
  } = useRegistrationContext();

  const handleStatusChangeConfirmation = async () => {
    await handleStatus();
    setChangeStatusModalIsOpen(false);
  };

  const handleDeleteConfirmation = async () => {
    await handleRemove();
    setDeleteRegistrationModalIsOpen(false);
  };

  return (
    <S.Container>
      {columns.map(({ status, title }) => {
        return (
          <S.Column status={status} key={title}>
            <>
              <S.TitleColumn status={status}>{title}</S.TitleColumn>
              <S.CollumContent>
                {registrations
                  ?.filter((registration) => registration.status === status)
                  .map((registration) => {
                    return (
                      <RegistrationCard
                        data={registration}
                        key={registration.id}
                        handleChangeStatusAction={() =>
                          setChangeStatusModalIsOpen(true)
                        }
                        handleRemoveAction={() =>
                          setDeleteRegistrationModalIsOpen(true)
                        }
                      />
                    );
                  })}
              </S.CollumContent>
            </>
          </S.Column>
        );
      })}
      <ChangeStatusModal
        isOpen={changeStatusModalIsOpen}
        onClose={() => setChangeStatusModalIsOpen(false)}
        handleStatusChangeConfirmation={handleStatusChangeConfirmation}
        currentRegistration={currentRegistration}
        newStatus={registrationNewStatus}
      />
      <DeleteRegistrationModal
        isOpen={deleteRegistrationModalIsOpen}
        onClose={() => setDeleteRegistrationModalIsOpen(false)}
        handleDeleteConfirmation={handleDeleteConfirmation}
        currentRegistration={currentRegistration}
      />
    </S.Container>
  );
};
export default Collumns;
