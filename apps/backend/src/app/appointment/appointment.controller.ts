import { Controller, Post, Body, Get } from '@nestjs/common';
import { Appointment } from '@mesha/interfaces';
import { AppointmentService } from './appointment.service';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  createNewAppointment(@Body() data: Appointment) {
    return this.appointmentService.createNewAppointment(data);
  }

  @Get()
  getAllAppointments() {
    return this.appointmentService.getAllAppointments();
  }
}
