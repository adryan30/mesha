import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Patient as IPatient, Appointment } from '@mesha/interfaces';

@Entity({ name: 'patient' })
export class Patient implements IPatient {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  birthday: Date;
  @Column()
  email: string;
  @Column()
  phone: string;
  @Column()
  photo: string;
  @OneToMany('Appointment', 'patient')
  appointment?: Appointment[];
}
