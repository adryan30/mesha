import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import {
  Patient as IPatient,
  Appointment as IAppointment,
  Procedure as IProcedure,
} from '@mesha/interfaces';

@Entity({ name: 'appointment' })
export class Appointment implements IAppointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  complaints: string;
  @Column()
  appointmentTime: number;
  @Column()
  totalTime: number;
  @Column()
  totalCost: number;
  @OneToMany('Procedure', 'parent', { cascade: true })
  procedures: IProcedure[];
  @ManyToOne('Patient', 'appointment')
  patient: IPatient;
}
