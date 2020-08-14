import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { Appointment } from '@mesha/interfaces';
import { AppointmentService } from './appointment.service';

/**
 * Controlodor de Atendimentos, responsável pelas
 * operações de criação e requisição de atendimentos
 */
@Controller('appointment')
export class AppointmentController {
  /**
   * Construtor para a injeção de depêndencias necessárias no controlador
   * @param appointmentService Serviço de Atendimentos, conecta com o Banco de dados
   */
  constructor(private readonly appointmentService: AppointmentService) {}

  /**
   * Metódo que insere novos atendimentos no banco de dados
   * @param data Representa um objeto de Atendimento
   */
  @Post()
  createNewAppointment(@Body() data: Appointment) {
    return this.appointmentService.createNewAppointment(data);
  }

  /**
   * Essa rota retorna todos os atendimentos registrados
   */
  @Get()
  getAllAppointments() {
    return this.appointmentService.getAllAppointments();
  }

  /**
   * Esse método restorna um atendimento específico do banco
   * @param id O UUID do atendimento desejado
   */
  @Get(':id')
  getOneAppointment(@Param('id') id: string) {
    return this.appointmentService.getOneAppointment(id);
  }
}
