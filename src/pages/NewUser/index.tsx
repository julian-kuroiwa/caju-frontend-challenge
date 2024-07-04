import { Formik } from 'formik';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { useHistory } from 'react-router-dom';
import Button from '~/components/Buttons';
import { IconButton } from '~/components/Buttons/IconButton';
import TextField from '~/components/TextField';
import { initialValues } from '~/constants/registrations';
import { useRegistrationContext } from '~/contexts/RegistrationsContext';
import routes from '~/router/routes';
import { Registration } from '~/types/registration';
import { masks } from '~/utils/masks';
import { sanitize } from '~/utils/sanitize';
import { validationSchema } from './schemaValidation';
import * as S from './styles';

const NewUserPage = () => {
  const { addNewRegistration } = useRegistrationContext();
  const history = useHistory();
  const goToHome = () => {
    history.push(routes.dashboard);
  };

  const onSubmit = async (values: Registration) => {
    console.log(values);
    await addNewRegistration(values);
    goToHome();
  };

  return (
    <S.Container>
      <S.Card>
        <IconButton onClick={() => goToHome()} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnChange
          validateOnBlur
          onSubmit={onSubmit}>
          {({ handleSubmit, errors, values, setFieldValue }) => {
            return (
              <S.CustomForm onSubmit={handleSubmit} noValidate>
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
                <Button>Cadastrar</Button>
              </S.CustomForm>
            );
          }}
        </Formik>
      </S.Card>
    </S.Container>
  );
};

export default NewUserPage;
