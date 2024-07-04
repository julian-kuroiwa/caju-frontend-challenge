import { useEffect, useState } from 'react';
import { HiRefresh } from 'react-icons/hi';
import { useHistory } from 'react-router-dom';
import Button from '~/components/Buttons';
import { IconButton } from '~/components/Buttons/IconButton';
import TextField from '~/components/TextField';
import { useRegistrationContext } from '~/contexts/RegistrationsContext';
import { useDebounce } from '~/hooks/useDebounce';
import routes from '~/router/routes';
import { masks } from '~/utils/masks';
import { sanitize } from '~/utils/sanitize';
import * as S from './styles';

type Props = {
  handleRefresh: () => void;
};

export const SearchBar = ({ handleRefresh }: Props) => {
  const history = useHistory();
  const [value, setValue] = useState('');
  const { getRegistrations } = useRegistrationContext();
  const debouncedValue = useDebounce(value);

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  useEffect(() => {
    const filter = debouncedValue ? `cpf=${sanitize(debouncedValue)}` : '';
    getRegistrations(filter);
  }, [debouncedValue]);

  return (
    <S.Container>
      <TextField
        placeholder="Digite um CPF válido"
        onChange={(e) => setValue(masks.cpf(e.target.value))}
        value={value}
      />
      <S.Actions>
        <IconButton aria-label="refetch" onClick={handleRefresh}>
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
