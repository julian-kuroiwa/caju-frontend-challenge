import { useCallback } from 'react';
import {
  HiOutlineCalendar,
  HiOutlineMail,
  HiOutlineUser,
} from 'react-icons/hi';
import { ButtonSmall } from '~/components/Buttons';
import { useRegistrationContext } from '~/contexts/RegistrationsContext';
import { Registration, StatusType } from '~/types/registration';
import { masks } from '~/utils/masks';
import * as S from './styles';

const { REVIEW, APPROVED, REPROVED } = StatusType;

type Props = {
  data: Registration;
  handleChangeStatusAction: () => void;
  handleRemoveAction: () => void;
};

const RegistrationCard = ({
  data,
  handleChangeStatusAction,
  handleRemoveAction,
}: Props) => {
  const { setRegistrationNewStatus, setCurrentRegistration } =
    useRegistrationContext();
  const { employeeName, email, admissionDate, status } = data;

  const handleStatusAction = useCallback(
    (status: keyof typeof StatusType) => {
      setRegistrationNewStatus(status);
      setCurrentRegistration(data);

      handleChangeStatusAction();
    },
    [data],
  );

  const handleDeleteAction = useCallback(() => {
    setCurrentRegistration(data);

    handleRemoveAction();
  }, [data]);

  return (
    <S.Card data-testid={`registration-card-${data.status}`}>
      <S.IconAndText>
        <HiOutlineUser />
        <h3>{employeeName}</h3>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineMail />
        <p>{email}</p>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineCalendar />
        <span>{masks.date(admissionDate)}</span>
      </S.IconAndText>
      <S.Actions>
        {status === REVIEW && (
          <>
            <ButtonSmall
              bgcolor="rgb(255, 145, 154)"
              onClick={() => handleStatusAction(REPROVED)}
              data-testid="change-status-modal-reproved-button">
              Reprovar
            </ButtonSmall>
            <ButtonSmall
              bgcolor="rgb(155, 229, 155)"
              onClick={() => handleStatusAction(APPROVED)}
              data-testid="change-status-modal-approved-button">
              Aprovar
            </ButtonSmall>
          </>
        )}
        {(status === APPROVED || status === REPROVED) && (
          <ButtonSmall
            bgcolor="#ff8858"
            onClick={() => handleStatusAction(REVIEW)}
            data-testid="change-status-modal-review-button">
            Revisar novamente
          </ButtonSmall>
        )}
        <S.HiOutlineTrashCustom
          role="button"
          data-testid="delete-button"
          onClick={handleDeleteAction}
        />
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
