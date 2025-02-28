import * as Yup from 'yup';
import { StatusType } from '~/types/registration';
import { validations } from "~/utils/validations";

  const fullNameRegex =
  /(^[A-Za-z]{2,})([ ]{0,1})([A-Za-z]{2,})?([ ]{0,1})?([A-Za-z]{2,})?([ ]{0,1})?([A-Za-z]{2,})/;
  
  export const validationSchema = Yup.object({
    employeeName: Yup.string()
      .matches(fullNameRegex, 'Nome inválido')
      .required('Nome é obrigatório'),
    email: Yup.string()
      .email('E-mail é inválido')
      .required('E-mail é obrigatorio'),
    cpf: Yup.string()
      .test('cpf', 'CPF é inválido', (value: string | undefined) =>
        validations.cpf(value || ''),
      )
      .required('CPF é obrigatório'),
    admissionDate: Yup.string().required('Data de admissão é obrigatório'),
    status: Yup.mixed<string>().oneOf(Object.values(StatusType)).required()
  });

