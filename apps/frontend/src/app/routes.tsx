import React from 'react';
import { Route } from 'react-router-dom';

import Home from './pages/Home';
import Patients from './pages/Patients';
import Appointments from './pages/Appointments';
import NewPatients from './pages/NewPatients';

const Routes: React.FC = () => {
  return (
    <>
      <Route path="/" component={Home} exact />
      <Route path="/patients" component={Patients} exact />
      <Route path="/patients/new" component={NewPatients} />
      <Route path="/appointments" component={Appointments} />
    </>
  );
};

export default Routes;
