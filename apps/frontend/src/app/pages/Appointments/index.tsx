import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Card, Table, Button, Modal, Select, message as toaster } from 'antd';

import { Appointment, Patient } from '@mesha/interfaces';
import { api, formatSecondsToTime } from '@mesha/shared';

const { Option } = Select;
const { Column } = Table;

const Appointments: React.FC = () => {
  const history = useHistory();
  const [modalVisible, setModalVisible] = useState(false);
  const [patientId, setPatientId] = useState<string>();
  const [appointments, setAppointments] = useState<Array<Appointment>>([]);
  const [patients, setPatients] = useState<Array<Patient>>([]);
  const switchModal = () => setModalVisible(!modalVisible);
  const handleModalChange = (value: string) => setPatientId(value);
  const handleModalClose = () => {
    switchModal();
    history.push(`/appointments/new/${patientId}`);
  };
  const getAppointments = () => {
    api
      .get('/appointment')
      .then((response) => {
        if (response.status === 200) {
          setAppointments(response.data);
        }
      })
      .catch(() => {
        toaster.error('Erro ao buscar Atendimentos');
      });
  };
  const getPatients = () => {
    api
      .get('/patient')
      .then((response) => {
        if (response.status === 200) {
          setPatients(response.data);
        }
      })
      .catch(() => {
        toaster.error('Erro ao buscar Pacientes');
      });
  };

  useEffect(() => {
    getAppointments();
    getPatients();
  }, []);

  return (
    <div>
      <Card
        title="Seus atendimentos"
        extra={<Button onClick={switchModal}>Começar novo atendimento</Button>}
      >
        <Table dataSource={appointments}>
          <Column
            title="Atendimento para"
            dataIndex="patient"
            key="patient"
            render={({ name }: Patient) => <div>{name}</div>}
          />
          <Column
            title="Valor Total"
            dataIndex="totalCost"
            key="totalCost"
            render={(totalCost: number) => (
              <div>R$ {totalCost.toFixed(2).replace('.', ',')}</div>
            )}
          />
          <Column
            title="Duração de tratamento"
            dataIndex="totalTime"
            key="totalTime"
            render={(totalTime: number) => (
              <div>{formatSecondsToTime(totalTime)}</div>
            )}
          />
          ]
          <Column
            title="Duração do atendimento"
            dataIndex="appointmentTime"
            key="appointmentTime"
            render={(appointmentTime: number) => (
              <div>{formatSecondsToTime(appointmentTime)}</div>
            )}
          />
          <Column
            title="Ações"
            key="action"
            render={(_: string, record: Appointment) => (
              <Link to={`/appointments/print/${record.id}`}>
                <Button>Imprimir relatório</Button>
              </Link>
            )}
          />
        </Table>
        <Modal
          title="Selecione um paciente"
          visible={modalVisible}
          onOk={handleModalClose}
          onCancel={switchModal}
        >
          <Select defaultValue={null} onChange={handleModalChange}>
            <Option value={null} disabled>
              Selecione um paciente
            </Option>
            {patients.map((patient) => (
              <Option value={patient.id} key={patient.id}>
                {patient.name}
              </Option>
            ))}
          </Select>
        </Modal>
      </Card>
    </div>
  );
};

export default Appointments;
