import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import TextField from "~/components/TextField";
import routes from "~/router/routes";
import * as S from "./styles";
import {masks} from "~/utils/masks";
import { useContext, useEffect, useState } from "react";
import { RegistrationContext } from "~/contexts/RegistrationsContext";
import { useDebounce } from "~/hooks/useDebounce";
import { sanitize } from "~/utils/sanitize";

export const SearchBar = () => {
  const history = useHistory();
  const [value, setValue] = useState('')
  const {loadContent, getRegistrations} = useContext(RegistrationContext)
  const debouncedValue = useDebounce(value)

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  useEffect(() => {
      const filter = debouncedValue ? `cpf=${sanitize(debouncedValue)}` : ''
      getRegistrations(filter)
  }, [debouncedValue])
  
  return (
    <S.Container>
      <TextField 
        placeholder="Digite um CPF válido"
        onChange={(e) => setValue(masks.cpf(e.target.value))}
        value={value}
      />
      <S.Actions>
        <IconButton aria-label="refetch" onClick={loadContent}>
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
