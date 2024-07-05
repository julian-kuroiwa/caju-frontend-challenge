import { Registration } from '~/types/registration';
import { columns } from '../../constants';
import RegistrationCard from '../RegistrationCard';
import * as S from './styles';

type Props = {
  registrations?: Registration[];
  handleRemoveCard: () => void;
  handleChangeStatus: () => void;
};

const Collumns = ({
  registrations,
  handleRemoveCard,
  handleChangeStatus,
}: Props) => {
  return (
    <S.Container>
      {columns.map(({ status, title }) => {
        return (
          <S.Column status={status} key={title} data-testid={status}>
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
                        handleChangeStatusAction={handleChangeStatus}
                        handleRemoveAction={handleRemoveCard}
                      />
                    );
                  })}
              </S.CollumContent>
            </>
          </S.Column>
        );
      })}
    </S.Container>
  );
};
export default Collumns;
