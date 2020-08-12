import React, { useState } from 'react';
import { Appointment, Patient } from '@mesha/interfaces';
import { useHistory } from 'react-router-dom';
import { Space, Card, Table, Button, Modal, Select } from 'antd';
import { convertSecondsToTime } from './utils';

const Appointments: React.FC = () => {
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const [patientId, setPatientId] = useState();
  const [data, setData] = useState<Array<Appointment>>([
    {
      id: '1',
      appointmentTime: 660,
      complaints: 'Dor de cabeça',
      procedures: [
        {
          id: '1',
          name: 'Dorflex',
          cost: 30,
          time: 10,
        },
      ],
      patient: {
        id: '1',
        name: 'John Brown',
        photo: 'https://randomuser.me/api/portraits/men/40.jpg',
        birthday: new Date(2002, 3, 17),
        email: 'adryan.software@gmail.com',
        phone: '+5582996893340',
      },
      totalCost: 30,
      totalTime: 600,
    },
    {
      id: '2',
      appointmentTime: 660,
      complaints: 'Dor de cabeça',
      procedures: [
        {
          id: '1',
          name: 'Dorflex',
          cost: 30,
          time: 10,
        },
      ],
      patient: {
        id: '2',
        name: 'Jim Green',
        photo: 'https://randomuser.me/api/portraits/men/41.jpg',
        birthday: new Date(2002, 3, 17),
        email: 'adryan.software@gmail.com',
        phone: '+5582996893340',
      },
      totalCost: 30,
      totalTime: 601,
    },
    {
      id: '3',
      appointmentTime: 660,
      complaints: 'Dor de cabeça',
      procedures: [
        {
          id: '1',
          name: 'Dorflex',
          cost: 30,
          time: 10,
        },
      ],
      patient: {
        id: '3',
        name: 'Joe Black',
        photo: 'https://randomuser.me/api/portraits/men/54.jpg',
        birthday: new Date(2002, 3, 17),
        email: 'adryan.software@gmail.com',
        phone: '+5582996893340',
      },
      totalCost: 30,
      totalTime: 630,
    },
  ]);

  const columns = [
    {
      title: 'Atendimento para',
      dataIndex: 'patient',
      key: 'patient',
      render: (patient: Patient) => <p>{patient.name}</p>,
    },
    {
      title: 'Valor Total',
      dataIndex: 'totalCost',
      key: 'totalCost',
      render: (totalCost: number) => (
        <p>R$ {totalCost.toFixed(2).replace('.', ',')}</p>
      ),
    },
    {
      title: 'Duração de tratamento',
      dataIndex: 'totalTime',
      key: 'totalTime',
      render: (totalTime: number) => <p>{convertSecondsToTime(totalTime)}</p>,
    },
    {
      title: 'Duração do atendimento',
      dataIndex: 'appointmentTime',
      key: 'appointmentTime',
      render: (appointmentTime: number) => (
        <p>{convertSecondsToTime(appointmentTime)}</p>
      ),
    },
    {
      title: 'Ações',
      key: 'action',
      render: (_: string, record: Appointment) => (
        <Space size="middle">
          <Button>Imprimir relatório</Button>
        </Space>
      ),
    },
  ];

  const switchModal = () => {
    setVisible(!visible);
  };
  const handleModalChange = (value) => {
    setPatientId(value);
  };
  const handleOk = () => {
    switchModal();
    history.push(`/appointments/new/${patientId}`);
  };

  return (
    <div>
      <Card
        title="Seus atendimentos"
        extra={<Button onClick={switchModal}>Começar novo atendimento</Button>}
      >
        <Table columns={columns} dataSource={data} />
        <Modal
          title="Selecione um paciente"
          visible={visible}
          onOk={handleOk}
          onCancel={switchModal}
        >
          <Select defaultValue={null} onChange={handleModalChange}>
            <Select.Option value={null} disabled>
              Selecione um paciente
            </Select.Option>
            {data.map((appointment) => {
              // Mudar para pedir lista de pacientes da API
              return (
                <Select.Option value={appointment.patient.id}>
                  {appointment.patient.name}
                </Select.Option>
              );
            })}
          </Select>
        </Modal>
      </Card>
    </div>
  );
};

export default Appointments;
