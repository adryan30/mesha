export interface Pacient {
  name: string;
  birthday: Date;
  email: string;
  phone: string;
  photo: string;
  appointment: Array<Appointment>
}

/**
 * Valores que representam tempo são tipados como inteiro para facilitar o armazenamento no banco
 */

export interface Appointment {
  complaints: string;
  appointmentTime: number;
  procedures: Array<Procedure>
  totalTime: number;
  totalCost: number;
}

export interface Procedure {
  cost: string;
  time: number;
}
