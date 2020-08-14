import React from 'react';
import { Route } from 'react-router-dom';
import {
  Home,
  Patients,
  NewPatients,
  Appointments,
  PrintPage,
  NewAppointments,
  CSVConsumer,
} from './pages';

/**
 * Coleção de rotas da aplicação, todos os caminhos devem ser concentrados aqui
 */
const Routes: React.FC = () => {
  return (
    <>
      <Route path="/" component={Home} exact />
      <Route path="/patients" component={Patients} exact />
      <Route path="/patients/new" component={NewPatients} />
      <Route path="/appointments" component={Appointments} exact />
      <Route path="/appointments/print/:id" component={PrintPage} />
      <Route path="/appointments/new/:id" component={NewAppointments} />
      <Route path="/csv" component={CSVConsumer} />
    </>
  );
};

export default Routes;
