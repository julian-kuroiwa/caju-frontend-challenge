import { useCallback } from 'react';
import { Registration } from '~/contexts/RegistrationsContext';
import RegistrationCard from '../RegistrationCard';
import * as S from './styles';

const allColumns = [
  { status: 'REVIEW', title: 'Pronto para revisar' },
  { status: 'APPROVED', title: 'Aprovado' },
  { status: 'REPROVED', title: 'Reprovado' },
];

type Props = {
  registrations?: Registration[];
};

const Collumns = ({ registrations }: Props) => {
  const filteredRegistrationCards = useCallback(
    (status: string) => {
      return registrations
        ?.filter((registration) => registration.status === status)
        .map((registration) => {
          return <RegistrationCard data={registration} key={registration.id} />;
        });
    },
    [registrations],
  );

  return (
    <S.Container>
      {allColumns.map(({ status, title }) => {
        return (
          <S.Column status={status} key={title}>
            <>
              <S.TitleColumn status={status}>{title}</S.TitleColumn>
              <S.CollumContent>
                {filteredRegistrationCards(status)}
              </S.CollumContent>
            </>
          </S.Column>
        );
      })}
    </S.Container>
  );
};
export default Collumns;
