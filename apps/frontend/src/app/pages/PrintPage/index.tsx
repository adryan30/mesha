import React, { useState, useEffect, useRef } from 'react';
import {
  Card,
  Spin,
  Table,
  Button,
  Avatar,
  Typography,
  message as toaster,
} from 'antd';
import { useParams } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import moment from 'moment';

import { api, apiURL, formatSecondsToTime } from '@mesha/shared';
import { Appointment } from '@mesha/interfaces';

const { Text } = Typography;
const { Summary, Column } = Table;
const { Cell, Row } = Summary;

/**
 * Página para a visualização de relatórios, também permite a impressão
 */
const PrintPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const printAreaRef = useRef();
  const [appointment, setAppointment] = useState<Appointment>();
  const getAppointment = (id: string) => {
    api
      .get(`/appointment/${id}`)
      .then((response) => {
        if (response.status === 200) return setAppointment(response.data);
      })
      .catch(() => {
        toaster.error('Erro ao tentar recuperar atendimento');
      });
  };
  useEffect(() => {
    getAppointment(id);
  }, [id]);

  if (appointment) {
    const { patient } = appointment;
    return (
      <>
        <div ref={printAreaRef}>
          <Card
            title={`Relatório #${id}`}
            extra={`Tempo de consulta: ${formatSecondsToTime(
              appointment.appointmentTime
            )}`}
          >
            <Card title="Informações do paciente">
              <Avatar
                src={`${apiURL}/uploads/${patient.photo}`}
                alt={`Avatar de ${patient.name}`}
                size={200}
              />
              <ul style={{ marginTop: 30 }}>
                <li>Nome: {patient.name}</li>
                <li>Email: {patient.email}</li>
                <li>Telefone: {patient.phone}</li>
                <li>
                  Data de Nascimento:{' '}
                  {moment.utc(patient.birthday).format('DD/MM/YYYY')}
                </li>
              </ul>
            </Card>
            <Card title="Queixas do paciente">{appointment.complaints}</Card>
            <Card title="Procedimentos recomendados">
              <Table
                dataSource={appointment.procedures}
                pagination={false}
                summary={() => (
                  <Row>
                    <Cell index={0}>
                      <Text type={'danger'}>Total</Text>
                    </Cell>
                    <Cell index={1}>
                      R$ {appointment.totalCost.toFixed(2).replace('.', ',')}
                    </Cell>
                    <Cell index={1}>
                      {formatSecondsToTime(appointment.totalTime)}
                    </Cell>
                  </Row>
                )}
              >
                <Column title="Nome" dataIndex="name" key="name" />
                <Column
                  title="Custo"
                  dataIndex="cost"
                  key="cost"
                  render={(cost: number) => (
                    <div>R$ {cost.toFixed(2).replace('.', ',')}</div>
                  )}
                />
                <Column
                  title="Tempo de tratamento"
                  dataIndex="time"
                  key="time"
                  render={(time: number) => <p>{formatSecondsToTime(time)}</p>}
                />
              </Table>
            </Card>
          </Card>
        </div>
        <ReactToPrint
          trigger={() => (
            <Button style={{ marginTop: 15 }} type="primary">
              Imprimir
            </Button>
          )}
          content={() => printAreaRef.current}
        />
      </>
    );
  }
  return (
    <Spin tip="Carregando atendimento..." style={{ width: '100%' }}></Spin>
  );
};

export default PrintPage;
