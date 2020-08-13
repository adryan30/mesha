import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Appointment } from '../entities/appointment.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectConnection()
    private readonly db: Connection
  ) {}

  createNewAppointment(data: Appointment) {
    return this.db.transaction((entityManager) => {
      const createAppointement = entityManager.create(Appointment, data);
      return entityManager.save(createAppointement);
    });
  }

  getAllAppointments() {
    return this.db.transaction((entityManager) => {
      return entityManager.find(Appointment, {
        relations: ['patient', 'procedures'],
      });
    });
  }

  getOneAppointment(id: string) {
    return this.db.transaction((entityManager) => {
      return entityManager.findOne(Appointment, id, {
        relations: ['patient', 'procedures'],
      });
    });
  }
}
