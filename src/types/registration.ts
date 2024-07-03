export enum StatusType {
  REVIEW = 'REVIEW',
  APPROVED = 'APPROVED',
  REPROVED = 'REPROVED',
}

export interface Registration {
  admissionDate: string;
  cpf: string;
  email: string;
  employeeName: string;
  id: string;
  status: keyof typeof StatusType;
}