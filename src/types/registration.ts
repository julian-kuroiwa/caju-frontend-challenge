export enum StatusType {
  REVIEW = 'REVIEW',
  APPROVED = 'APPROVED',
  REPROVED = 'REPROVED',
}

export enum StatusTranslation {
  REVIEW = 'Pronto para revisar',
  APPROVED = 'Aprovado',
  REPROVED = 'Reprovado',
}

export interface Registration {
  admissionDate: string;
  cpf: string;
  email: string;
  employeeName: string;
  id: string;
  status: string;
}

export type NewRegistration = Omit<Registration, 'id'>;
