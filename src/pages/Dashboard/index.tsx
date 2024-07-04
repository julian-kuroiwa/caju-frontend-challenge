import { useState } from 'react';
import { useRegistrationContext } from '~/contexts/RegistrationsContext';
import Collumns from './components/Columns';
import RefreshContentModal from './components/Modals/RefreshContentModal';
import { SearchBar } from './components/Searchbar';
import * as S from './styles';

const DashboardPage = () => {
  const [refreshContentModalIsOpen, setRefreshContentModalIsOpen] =
    useState(false);
  const { registrations, loadContent } = useRegistrationContext();

  const handleConfirmation = () => {
    setRefreshContentModalIsOpen(false);
    loadContent();
  };

  return (
    <S.Container>
      <SearchBar handleRefresh={() => setRefreshContentModalIsOpen(true)} />
      <Collumns registrations={registrations} />
      <RefreshContentModal
        isOpen={refreshContentModalIsOpen}
        onClose={() => setRefreshContentModalIsOpen(false)}
        handleConfirmation={handleConfirmation}
      />
    </S.Container>
  );
};
export default DashboardPage;
