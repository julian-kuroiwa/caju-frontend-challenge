import Collumns from "./components/Columns";
import * as S from "./styles";
import { SearchBar } from "./components/Searchbar";
import { useContext } from "react";
import { RegistrationContext } from "~/contexts/RegistrationsContext";

const DashboardPage = () => {
  const {registrations} = useContext(RegistrationContext)

  return (
    <S.Container>
      <SearchBar />
      <Collumns registrations={registrations} />
    </S.Container>
  );
};
export default DashboardPage;
