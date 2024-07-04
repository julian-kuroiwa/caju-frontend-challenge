import { Registration, StatusType } from "~/types/registration";

export const initialValues = {
  employeeName: '',
  email: '',
  cpf: '',
  admissionDate: '',
  status: StatusType.REVIEW,
} as Registration;