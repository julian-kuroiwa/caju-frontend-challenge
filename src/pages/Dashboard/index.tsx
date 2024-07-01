import Collumns from "./components/Columns";
import * as S from "./styles";
import { SearchBar } from "./components/Searchbar";
import request from "~/api";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [registrations, setRegistrations] = useState<any>()

  const getRegistrations = async () => {
    try {
      const response = await request.get('/registrations')

      return response.data
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getRegistrations().then(data => setRegistrations(data))
  }, [])

  return (
    <S.Container>
      <SearchBar />
      <Collumns registrations={registrations} />
    </S.Container>
  );
};
export default DashboardPage;
