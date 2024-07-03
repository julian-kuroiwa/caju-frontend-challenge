import { useContext } from 'react';
import {
  HiOutlineCalendar,
  HiOutlineMail,
  HiOutlineUser,
} from 'react-icons/hi';
import { ButtonSmall } from '~/components/Buttons';
import { RegistrationContext } from '~/contexts/RegistrationsContext';
import { Registration, StatusType } from '~/types/registration';
import { masks } from '~/utils/masks';
import * as S from './styles';

const { REVIEW, APPROVED, REPROVED } = StatusType;

type Props = {
  data: Registration;
};

const RegistrationCard = ({ data }: Props) => {
  const { handleStatus, handleRemove } = useContext(RegistrationContext);
  const { employeeName, email, admissionDate, id, status } = data;

  return (
    <S.Card>
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
              onClick={() =>
                handleStatus({ registration: data, status: 'REPROVED' })
              }>
              Reprovar
            </ButtonSmall>
            <ButtonSmall
              bgcolor="rgb(155, 229, 155)"
              onClick={() =>
                handleStatus({ registration: data, status: 'APPROVED' })
              }>
              Aprovar
            </ButtonSmall>
          </>
        )}
        {(status === APPROVED || status === REPROVED) && (
          <ButtonSmall
            bgcolor="#ff8858"
            onClick={() =>
              handleStatus({ registration: data, status: 'REVIEW' })
            }>
            Revisar novamente
          </ButtonSmall>
        )}
        <S.HiOutlineTrashCustom
          role="button"
          onClick={() => handleRemove(id)}
        />
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
