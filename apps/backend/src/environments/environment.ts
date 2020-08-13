import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Patient } from '../app/entities/patient.entity';
import { Appointment } from '../app/entities/appointment.entity';
import { Procedure } from '../app/entities/procedure.entity';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export interface BackendEnv {
  production: boolean;
  db: TypeOrmModuleOptions;
  multer: MulterOptions;
}

export const environment: BackendEnv = {
  production: false,
  db: {
    type: 'postgres',
    host: 'motty.db.elephantsql.com',
    port: 5432,
    username: 'sksjqlmt',
    password: 'TfQT7USXH3H8OTiVWYFuWC-IfTZYps5O',
    database: 'sksjqlmt',
    entities: [Patient, Appointment, Procedure],
    synchronize: true,
  },
  multer: {
    dest: __dirname + '/uploads',
  },
};
