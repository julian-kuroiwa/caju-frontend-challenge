import { useCallback } from 'react';
import { Registration } from '~/types/registration';
import { columns } from '../../constants';
import RegistrationCard from '../RegistrationCard';
import * as S from './styles';

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
      {columns.map(({ status, title }) => {
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
