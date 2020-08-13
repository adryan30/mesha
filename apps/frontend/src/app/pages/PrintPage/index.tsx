import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Spin, Table, Button, Row, Col, Avatar, Typography } from 'antd';
import { Appointment } from '@mesha/interfaces';
import { api } from '../../../utils/api';
import Column from 'antd/lib/table/Column';
import { convertSecondsToTime } from '../Appointments/utils';
import ReactToPrint from 'react-to-print';
import { environment } from '../../../environments/environment';
import moment from 'moment';
const { Text } = Typography;
const { apiURL } = environment;

const PrintPage: React.FC = () => {
  const { id } = useParams();
  const componentRef = useRef();
  const [appointment, setAppointment] = useState<Appointment>();
  useEffect(() => {
    api.get(`/appointment/${id}`).then((response) => {
      if (response.status === 200) {
        setAppointment(response.data);
      }
      console.log(response);
    });
  }, [id]);

  if (appointment) {
    const { patient } = appointment;
    return (
      <>
        <div ref={componentRef}>
          <Card
            title={`Relatório #${id}`}
            extra={`Tempo de consulta: ${convertSecondsToTime(
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
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0}>
                      <Text type={'danger'}>Total</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>
                      R$ {appointment.totalCost.toFixed(2).replace('.', ',')}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>
                      {convertSecondsToTime(appointment.totalTime)}
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
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
                  render={(time: number) => <p>{convertSecondsToTime(time)}</p>}
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
          content={() => componentRef.current}
        />
      </>
    );
  }
  return (
    <Spin tip="Carregando atendimento..." style={{ width: '100%' }}></Spin>
  );
};

export default PrintPage;
