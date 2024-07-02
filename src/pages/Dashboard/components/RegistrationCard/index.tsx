import { ButtonSmall } from "~/components/Buttons";
import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import { useContext } from "react";
import { Registration, RegistrationContext } from "~/contexts/RegistrationsContext";

type Props = {
  data: Registration;
};

const RegistrationCard = ({data}: Props) => {
  const {handleStatus, handleRemove} = useContext(RegistrationContext)
  const {employeeName, email, admissionDate, id} = data

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
        <span>{admissionDate}</span>
      </S.IconAndText>
      <S.Actions>
        <ButtonSmall bgcolor="rgb(255, 145, 154)" onClick={() => handleStatus({registration: data, status: 'REPROVED'})}>Reprovar</ButtonSmall>
        <ButtonSmall bgcolor="rgb(155, 229, 155)" onClick={() => handleStatus({registration: data, status: 'APPROVED'})}>Aprovar</ButtonSmall>
        <ButtonSmall bgcolor="#ff8858" onClick={() => handleStatus({registration: data, status: 'REVIEW'})}>Revisar novamente</ButtonSmall>

        <HiOutlineTrash role="button" onClick={() => handleRemove(id)} />
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
