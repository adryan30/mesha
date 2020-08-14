import React, { useState, useEffect } from 'react';
import { Card, Table, Avatar, message } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { Patient } from '@mesha/interfaces';
import { api, getPhotoUrl } from '@mesha/shared';

const { Column } = Table;
const Patients: React.FC = () => {
  const [data, setData] = useState<Array<Patient>>([]);
  useEffect(() => {
    api
      .get('/patient')
      .then((response) => {
        if (response.status === 200) setData(response.data);
      })
      .catch(() => {
        message.error('Erro ao buscar usuários cadastrados');
      });
  }, []);

  return (
    <div>
      <Card
        title="Seus pacientes"
        extra={<Link to="/patients/new">Criar novo paciente</Link>}
      >
        <Table dataSource={data}>
          <Column
            title="Avatar"
            dataIndex="photo"
            key="photo"
            render={(photo: string, record: Patient) => (
              <Avatar
                src={getPhotoUrl(photo)}
                alt={`Avatar de ${record.name}`}
                size={75}
              />
            )}
          />
          <Column title="Name" dataIndex="name" key="name" />
          <Column
            title="Data de nascimento"
            dataIndex="birthday"
            key="birthday"
            render={(birthday: string) => (
              <div>{moment(birthday).add(3, 'hours').format('DD/MM/YYYY')}</div>
            )}
          />
          <Column title="Email" dataIndex="email" key="email" />
          <Column title="Telefone" dataIndex="phone" key="phone" />
          <Column
            title="Ações"
            key="action"
            render={(_: string, record: Patient) => (
              <Link to={`/appointments/new/${record.id}`}>
                Novo atendimento
              </Link>
            )}
          />
        </Table>
      </Card>
    </div>
  );
};

export default Patients;
