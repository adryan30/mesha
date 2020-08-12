import React from 'react';
import { Route } from 'react-router-dom';

import Home from './pages/Home';
import Patients from './pages/Patients';
import Appointments from './pages/Appointments';

const Routes: React.FC = () => {
  return (
    <>
      <Route path="/" component={Home} exact />
      <Route path="/patients" component={Patients} />
      <Route path="/appointments" component={Appointments} />
    </>
  );
};

export default Routes;
