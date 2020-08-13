import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Patient } from '../entities/patient.entity';
import { Connection } from 'typeorm';

@Injectable()
export class PatientService {
  constructor(
    @InjectConnection()
    private readonly db: Connection
  ) {}

  async createNewPatient(data: Patient) {
    this.db.transaction((entityManager) => {
      return entityManager.save(Patient, data);
    });
  }

  async getAllPatients() {
    return this.db.transaction((entityManager) => {
      return entityManager.find(Patient);
    });
  }
}
