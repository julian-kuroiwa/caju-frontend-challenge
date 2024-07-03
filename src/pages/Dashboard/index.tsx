import { useContext } from 'react';
import { RegistrationContext } from '~/contexts/RegistrationsContext';
import Collumns from './components/Columns';
import { SearchBar } from './components/Searchbar';
import * as S from './styles';

const DashboardPage = () => {
  const { registrations } = useContext(RegistrationContext);

  return (
    <S.Container>
      <SearchBar />
      <Collumns registrations={registrations} />
    </S.Container>
  );
};
export default DashboardPage;
