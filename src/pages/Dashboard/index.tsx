import { useEffect, useState } from 'react';
import { useRegistrationContext } from '~/contexts/RegistrationsContext';
import Collumns from './components/Columns';
import { SearchBar } from './components/Searchbar';
import ChangeStatusModal from './modals/ChangeStatusModal';
import DeleteRegistrationModal from './modals/DeleteRegistrationModal';
import RefreshContentModal from './modals/RefreshContentModal';
import * as S from './styles';

const DashboardPage = () => {
  const [refreshContentModalIsOpen, setRefreshContentModalIsOpen] =
    useState(false);
  const [filter, setfilter] = useState('');
  const [changeStatusModalIsOpen, setChangeStatusModalIsOpen] = useState(false);
  const [deleteRegistrationModalIsOpen, setDeleteRegistrationModalIsOpen] =
    useState(false);

  const {
    getRegistrations,
    registrations,
    loadContent,
    handleStatus,
    handleRemove,
    currentRegistration,
    registrationNewStatus,
  } = useRegistrationContext();

  const handleConfirmation = () => {
    setRefreshContentModalIsOpen(false);
    loadContent();
  };

  const handleStatusChangeConfirmation = async () => {
    await handleStatus();
    setChangeStatusModalIsOpen(false);
  };

  const handleDeleteConfirmation = async () => {
    await handleRemove();
    setDeleteRegistrationModalIsOpen(false);
  };

  useEffect(() => {
    getRegistrations(filter);
  }, [filter]);

  return (
    <S.Container>
      <SearchBar
        handleRefresh={() => setRefreshContentModalIsOpen(true)}
        handleSearch={setfilter}
      />
      <Collumns
        registrations={registrations}
        handleChangeStatus={() => setChangeStatusModalIsOpen(true)}
        handleRemoveCard={() => setDeleteRegistrationModalIsOpen(true)}
      />
      <RefreshContentModal
        isOpen={refreshContentModalIsOpen}
        onClose={() => setRefreshContentModalIsOpen(false)}
        handleConfirmation={handleConfirmation}
      />
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
export default DashboardPage;
