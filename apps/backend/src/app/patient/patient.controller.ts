import { Controller, Post, Body, Get } from '@nestjs/common';
import { PatientService } from './patient.service';
import { Patient } from '@mesha/interfaces';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  createNewPatient(@Body() data: Patient) {
    return this.patientService.createNewPatient(data);
  }

  @Get()
  getAllPatients() {
    return this.patientService.getAllPatients()
  }
}
