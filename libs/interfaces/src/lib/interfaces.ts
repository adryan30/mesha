export interface Patient {
  id: string;
  name: string;
  birthday: Date;
  email: string;
  phone: string;
  photo: string;
  appointment?: Array<Appointment>;
}

/**
 * Valores que representam tempo são tipados como inteiro para facilitar o armazenamento no banco
 */

export interface Appointment {
  id: string;
  complaints: string;
  appointmentTime: number;
  procedures: Array<Procedure>;
  totalTime: number;
  totalCost: number;
  patient: Patient;
}

export interface Procedure {
  id?: string;
  name: string;
  cost: number;
  time: number;
}
