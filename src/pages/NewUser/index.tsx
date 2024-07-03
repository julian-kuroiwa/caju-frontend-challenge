import { Formik } from 'formik';
import { useContext } from 'react';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { useHistory } from 'react-router-dom';
import Button from '~/components/Buttons';
import { IconButton } from '~/components/Buttons/IconButton';
import TextField from '~/components/TextField';
import { RegistrationContext } from '~/contexts/RegistrationsContext';
import routes from '~/router/routes';
import { Registration, StatusType } from '~/types/registration';
import { masks } from '~/utils/masks';
import { sanitize } from '~/utils/sanitize';
import { validationSchema } from './schemaValidation';
import * as S from './styles';

const { REVIEW } = StatusType;

const initialValues = {
  employeeName: '',
  email: '',
  cpf: '',
  admissionDate: '',
  status: REVIEW,
} as Registration;

const NewUserPage = () => {
  const { addNewRegistration } = useContext(RegistrationContext);
  const history = useHistory();
  const goToHome = () => {
    history.push(routes.dashboard);
  };

  const onSubmit = async (values: Registration) => {
    await addNewRegistration(values);
    goToHome();
  };

  return (
    <S.Container>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange
        validateOnBlur
        onSubmit={onSubmit}>
        {({ handleSubmit, errors, values, setFieldValue }) => {
          return (
            <S.Card onSubmit={handleSubmit} noValidate>
              <IconButton onClick={() => goToHome()} aria-label="back">
                <HiOutlineArrowLeft size={24} />
              </IconButton>
              <TextField
                placeholder="Nome"
                label="Nome"
                name="employeeName"
                value={values.employeeName}
                onChange={(e) => {
                  const { value } = e.target;
                  setFieldValue('employeeName', value);
                }}
                error={errors.employeeName as string}
              />
              <TextField
                placeholder="Email"
                label="Email"
                type="email"
                name="email"
                value={values.email}
                onChange={(e) => {
                  const { value } = e.target;
                  setFieldValue('email', value);
                }}
                error={errors.email as string}
              />
              <TextField
                placeholder="CPF"
                label="CPF"
                name="cpf"
                onChange={(e) => {
                  const { value } = e.target;

                  if (value.length <= 14 && /^[0-9.-]*$/.test(value)) {
                    setFieldValue('cpf', sanitize(value));
                  }
                }}
                value={masks.cpf(values.cpf)}
                error={errors.cpf as string}
              />
              <TextField
                label="Data de admissão"
                type="date"
                name="admissionDate"
                onChange={(e) => {
                  const { value } = e.target;
                  setFieldValue('admissionDate', value);
                }}
                error={errors.admissionDate as string}
              />
              <Button type="submit">Cadastrar</Button>
            </S.Card>
          );
        }}
      </Formik>
    </S.Container>
  );
};

export default NewUserPage;
