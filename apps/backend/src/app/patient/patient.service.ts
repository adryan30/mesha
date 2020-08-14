import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Patient } from '../entities/patient.entity';
import { Connection } from 'typeorm';

/**
 * Serviço de Pacientes, responsável por qualquer conexão externa
 * relacionada aos pacientes
 */
@Injectable()
export class PatientService {
  /**
   * Injeção de dependencias necessárias para a conexão com o banco
   * @param db Conexão com o banco de dados
   */
  constructor(
    @InjectConnection()
    private readonly db: Connection
  ) {}

  /**
   * Insere um novo paciente no banco, através de uma transação
   * @param data Representa o objeto de Paciente passado pelo controlador
   */
  async createNewPatient(data: Patient) {
    this.db.transaction((entityManager) => {
      return entityManager.save(Patient, data);
    });
  }

  /**
   * Lê todos os pacientes do banco e os retorna
   */
  async getAllPatients() {
    return this.db.transaction((entityManager) => {
      return entityManager.find(Patient);
    });
  }
}
