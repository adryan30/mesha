import React, { useState } from 'react';
import { Card, Space, Table } from 'antd';
import { Link } from 'react-router-dom';
import { Patient } from '@mesha/interfaces';
import Avatar from 'antd/lib/avatar/avatar';
import Title from 'antd/lib/skeleton/Title';

const Patients: React.FC = () => {
  const [data, setData] = useState<Array<Patient>>([
    {
      id: '1',
      name: 'John Brown',
      photo: 'https://randomuser.me/api/portraits/men/40.jpg',
      birthday: new Date(2002, 3, 17),
      email: 'adryan.software@gmail.com',
      phone: '+5582996893340',
    },
    {
      id: '2',
      name: 'Jim Green',
      photo: 'https://randomuser.me/api/portraits/men/41.jpg',
      birthday: new Date(2002, 3, 17),
      email: 'adryan.software@gmail.com',
      phone: '+5582996893340',
    },
    {
      id: '3',
      name: 'Joe Black',
      photo: 'https://randomuser.me/api/portraits/men/54.jpg',
      birthday: new Date(2002, 3, 17),
      email: 'adryan.software@gmail.com',
      phone: '+5582996893340',
    },
  ]);

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'photo',
      key: 'photo',
      render: (photo: string, record: Patient) => (
        <Avatar src={photo} alt={`Avatar de ${record.name}`} size={75} />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Patient) => (
        <Link to={`/patients/${record.id}`}>{text}</Link>
      ),
    },
    {
      title: 'Data de nascimento',
      dataIndex: 'birthday',
      key: 'birthday',
      render: (birthday: Date) => <p>{birthday.toLocaleDateString()}</p>,
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
          <Link to={`/appointment/${record.id}`}>Novo atendimento</Link>
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
