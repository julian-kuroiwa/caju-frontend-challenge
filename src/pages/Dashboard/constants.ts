import { StatusType } from "~/types/registration";

const { REVIEW, APPROVED, REPROVED } = StatusType

export const columns = [
  { status: REVIEW, title: 'Pronto para revisar' },
  { status: APPROVED, title: 'Aprovado' },
  { status: REPROVED, title: 'Reprovado' },
];