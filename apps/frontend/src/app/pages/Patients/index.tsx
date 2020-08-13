import React, { useState, useEffect } from 'react';
import { Card, Space, Table, message } from 'antd';
import { Link } from 'react-router-dom';
import { Patient } from '@mesha/interfaces';
import Avatar from 'antd/lib/avatar/avatar';
import { api } from '../../../utils/api';
import { environment } from '../../../environments/environment';
import moment from 'moment';

const { apiURL } = environment;

const Patients: React.FC = () => {
  const [data, setData] = useState<Array<Patient>>([]);
  useEffect(() => {
    api
      .get('/patient')
      .then((response) => {
        if (response.status === 200) {
          setData(response.data);
        }
      })
      .catch(() => {
        message.error('Erro ao buscar usuários cadastrados');
      });
  }, []);

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'photo',
      key: 'photo',
      render: (photo: string, record: Patient) => {
        console.log(photo);
        return (
          <Avatar
            src={`${apiURL}/uploads/${photo}`}
            alt={`Avatar de ${record.name}`}
            size={75}
          />
        );
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Data de nascimento',
      dataIndex: 'birthday',
      key: 'birthday',
      render: (birthday: string) => (
        <div>{moment(birthday).add(3, 'hours').format('DD/MM/YYYY')}</div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Telefone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Ações',
      key: 'action',
      render: (_: string, record: Patient) => (
        <Space size="middle">
          <Link to={`/appointments/new/${record.id}`}>Novo atendimento</Link>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card
        title="Seus pacientes"
        extra={<Link to="/patients/new">Criar novo paciente</Link>}
      >
        <Table columns={columns} dataSource={data} />
      </Card>
    </div>
  );
};

export default Patients;
