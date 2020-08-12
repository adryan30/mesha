import React from 'react';
import { Route } from 'react-router-dom';

import Home from './pages/Home';
import Patients from './pages/Patients';
import Appointments from './pages/Appointments';
import NewPatients from './pages/NewPatients';
import NewAppointments from './pages/NewAppointments';

const Routes: React.FC = () => {
  return (
    <>
      <Route path="/" component={Home} exact />
      <Route path="/patients" component={Patients} exact />
      <Route path="/patients/new" component={NewPatients} />
      <Route path="/appointments" component={Appointments} exact />
      <Route path="/appointments/new/:id" component={NewAppointments} exact />
    </>
  );
};

export default Routes;
