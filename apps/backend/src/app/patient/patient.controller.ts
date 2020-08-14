import { Controller, Post, Body, Get } from '@nestjs/common';
import { PatientService } from './patient.service';
import { Patient } from '@mesha/interfaces';

/**
 * Controlodor de Pacientes, responsável pelas
 * operações de criação e requisição de pacientes
 */
@Controller('patient')
export class PatientController {
  /**
   * Construtor para a injeção de depêndencias necessárias no controlador
   * @param patientService Serviço de Pacientes, conecta com o Banco de dados
   */
  constructor(private readonly patientService: PatientService) {}

  /**
   * Metódo que insere novos pacientes no banco de dados
   * @param data Representa um objeto de Paciente
   */
  @Post()
  createNewPatient(@Body() data: Patient) {
    return this.patientService.createNewPatient(data);
  }

  /**
   * Essa rota retorna todos os pacientes registrados
   */
  @Get()
  getAllPatients() {
    return this.patientService.getAllPatients();
  }
}
