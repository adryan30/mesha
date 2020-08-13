import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { environment } from '../environments/environment';
import { PatientModule } from './patient/patient.module';
const { db, multer } = environment;

@Module({
  imports: [
    TypeOrmModule.forRoot(db),
    MulterModule.register(multer),
    PatientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
