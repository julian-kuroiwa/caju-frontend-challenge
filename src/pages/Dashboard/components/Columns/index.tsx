
import * as S from "./styles";
import RegistrationCard from "../RegistrationCard";

const allColumns = [
  { status: 'REVIEW', title: "Pronto para revisar" },
  { status: 'APPROVED', title: "Aprovado" },
  { status: 'REPROVED', title: "Reprovado" },
];

type Props = {
  registrations?: any[];
};
const Collumns = ({registrations}: Props) => {
  const filteredRegistration = (status: string) => {
    return registrations?.filter((registration) => registration.status === status)
      .map((registration) => {
      return (
        <RegistrationCard
          data={registration}
          key={registration.id}
        />
      );
    })
  }

  return (
    <S.Container>
      {allColumns.map(({status, title}) => {
        return (
          <S.Column status={status} key={title}>
            <>
              <S.TitleColumn status={status}>
                {title}
              </S.TitleColumn>
              <S.CollumContent>
                {filteredRegistration(status)}
              </S.CollumContent>
            </>
          </S.Column>
        );
      })}
    </S.Container>
  );
};
export default Collumns;
