import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import {
  Procedure as IProcedure,
  Appointment as IAppointment,
} from '@mesha/interfaces';

@Entity({ name: 'procedure' })
export class Procedure implements IProcedure {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  cost: number;
  @Column()
  time: number;
  @ManyToOne('Appointment', 'procedures')
  parent: IAppointment;
}
