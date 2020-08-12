import React from 'react';
import { useParams } from 'react-router-dom';

const NewAppointments: React.FC = () => {
  const { id } = useParams();

  return <div>Paciente: {id}</div>;
};

export default NewAppointments;
