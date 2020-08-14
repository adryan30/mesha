import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Appointment } from '../entities/appointment.entity';

/**
 * Serviço de Atendimentos, responsável por qualquer conexão externa
 * relacionada aos atendimentos
 */
@Injectable()
export class AppointmentService {
  /**
   * Injeção de dependencias necessárias para a conexão com o banco
   * @param db Conexão com o banco de dados
   */
  constructor(
    @InjectConnection()
    private readonly db: Connection
  ) {}

  /**
   * Insere um novo atendimento no banco, através de uma transação
   * @param data Representa o objeto de Atendimento passado pelo controlador
   */
  createNewAppointment(data: Appointment) {
    return this.db.transaction((entityManager) => {
      const createAppointement = entityManager.create(Appointment, data);
      return entityManager.save(createAppointement);
    });
  }

  /**
   * Lê todos os atendimentos do banco, junto com
   * seus pacientes relacionados e procedimentos
   */
  getAllAppointments() {
    return this.db.transaction((entityManager) => {
      return entityManager.find(Appointment, {
        relations: ['patient', 'procedures'],
      });
    });
  }

  /**
   * Lê apenas um registro de atendimento, baseado no ID passado
   * @param id UUID de um atendimento específico
   */
  getOneAppointment(id: string) {
    return this.db.transaction((entityManager) => {
      return entityManager.findOne(Appointment, id, {
        relations: ['patient', 'procedures'],
      });
    });
  }
}
