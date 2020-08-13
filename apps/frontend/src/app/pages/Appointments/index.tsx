import React, { useState, useEffect } from 'react';
import { Appointment, Patient } from '@mesha/interfaces';
import { useHistory, Link } from 'react-router-dom';
import { Space, Card, Table, Button, Modal, Select, message } from 'antd';
import { convertSecondsToTime } from './utils';
import { api } from '../../../utils/api';

const Appointments: React.FC = () => {
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const [patientId, setPatientId] = useState<string>();
  const [appointments, setAppointments] = useState<Array<Appointment>>([]);
  const [patients, setPatients] = useState<Array<Patient>>([]);
  useEffect(() => {
    api
      .get('/appointment')
      .then((response) => {
        if (response.status === 200) {
          setAppointments(response.data);
        }
      })
      .catch(() => {
        message.error('Erro ao buscar Atendimentos');
      });
    api
      .get('/patient')
      .then((response) => {
        if (response.status === 200) {
          setPatients(response.data);
        }
      })
      .catch(() => {
        message.error('Erro ao buscar Pacientes');
      });
  }, []);

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
          <Link to={`/appointments/print/${record.id}`}>
            <Button>Imprimir relatório</Button>
          </Link>
        </Space>
      ),
    },
  ];

  const switchModal = () => {
    setVisible(!visible);
  };
  const handleModalChange = (value: string) => setPatientId(value);
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
        <Table columns={columns} dataSource={appointments} />
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
            {patients.map((patient) => {
              return (
                <Select.Option value={patient.id} key={patient.id}>
                  {patient.name}
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
