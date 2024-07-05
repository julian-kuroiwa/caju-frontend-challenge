import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { useHistory } from 'react-router-dom';
import Button from '~/components/Buttons';
import { IconButton } from '~/components/Buttons/IconButton';
import TextField from '~/components/TextField';
import { initialValues } from '~/constants/registrations';
import { useRegistrationContext } from '~/contexts/RegistrationsContext';
import routes from '~/router/routes';
import { NewRegistration } from '~/types/registration';
import { masks } from '~/utils/masks';
import { sanitize } from '~/utils/sanitize';
import ConfirmationModal from './modals/ConfirmationModal';
import * as S from './styles';
import { validationSchema } from './validationSchema';

const NewUserPage = () => {
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false)
  const [formData, setFormData] = useState<NewRegistration>(initialValues)
  const { addNewRegistration } = useRegistrationContext();
  const history = useHistory();
  const goToHome = () => {
    history.push(routes.dashboard);
  };

  const resolver = yupResolver(validationSchema);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: initialValues,
    resolver,
  });

  const handleConfirmation = async () => {
    await addNewRegistration(formData);
    goToHome();
  }

  const onSubmit: SubmitHandler<NewRegistration> = async (data) => {
    const newRegistration = {
      ...data,
      cpf: sanitize(data.cpf),
    };

    setFormData(newRegistration)
    setOpenConfirmationModal(true)
  };

  return (
    <S.Container>
      <S.Card>
        <IconButton onClick={() => goToHome()} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>
        <S.CustomForm onSubmit={handleSubmit(onSubmit)} noValidate>
          <Controller
            control={control}
            name="employeeName"
            render={({ field }) => (
              <TextField
                id="name"
                placeholder="Nome"
                label="Nome"
                {...field}
                error={errors.employeeName?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <TextField
                id="email"
                placeholder="Email"
                label="Email"
                type="email"
                {...field}
                error={errors.email?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="cpf"
            render={({ field }) => (
              <TextField
                id="cpf"
                placeholder="CPF"
                label="CPF"
                {...field}
                value={masks.cpf(field.value)}
                error={errors.cpf?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="admissionDate"
            render={({ field }) => (
              <TextField
                id="date"
                label="Data de admissão"
                type="date"
                {...field}
                error={errors.admissionDate?.message}
              />
            )}
          />

          <TextField type="hidden" {...register('status')} />
          <Button>Cadastrar</Button>
        </S.CustomForm>
      </S.Card>
      <ConfirmationModal isOpen={openConfirmationModal} onClose={() => setOpenConfirmationModal(false)} handleConfirmation={handleConfirmation} />
    </S.Container>
  );
};

export default NewUserPage;
