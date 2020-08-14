import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Card,
  Input,
  Form,
  Button,
  Col,
  Row,
  Table,
  Modal,
  message,
  InputNumber,
} from 'antd';
import { Store } from 'antd/lib/form/interface';
import Timer from 'react-compound-timer';

import { Procedure } from '@mesha/interfaces';
import { api, formatSecondsToTime } from '@mesha/shared';

const { Hours, Minutes, Seconds } = Timer;
const { TextArea } = Input;
const { Item, useForm } = Form;
const { Column } = Table;

const NewAppointments: React.FC = () => {
  const history = useHistory();
  const { id } = useParams();
  const [modalForm] = useForm();
  const [time, setTime] = useState<number>();
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const switchModal = () => setModalVisible(!modalVisible);
  const removeProcedure = (name: string) => {
    return setProcedures(
      procedures.filter((procedure) => procedure.name !== name)
    );
  };
  const addNewProcedure = (values: Store) => {
    const newProcedureData = values as Procedure;
    if (
      procedures.some((procedure) => procedure.name === newProcedureData.name)
    ) {
      return message.error('Esse procedimento já existe');
    }
    const procedureCost = Number(newProcedureData.cost);
    const procedureTime = newProcedureData.time * 3600;
    setProcedures([
      ...procedures,
      {
        name: newProcedureData.name,
        time: procedureTime,
        cost: procedureCost,
      },
    ]);
  };

  const createNewAppointment = ({
    complaints,
    procedures,
  }: {
    complaints: string;
    procedures: Procedure[];
  }) => {
    const totalCost = procedures
      .map((procedure) => procedure.cost)
      .reduce((previous, current) => previous + current);
    const totalTime = procedures
      .map((procedure) => procedure.time)
      .reduce((previous, current) => previous + current);
    api
      .post('/appointment', {
        patient: id,
        appointmentTime: time,
        complaints,
        procedures,
        totalCost,
        totalTime,
      })
      .then((response) => {
        if (response.status === 201) history.push('/appointments');
      });
  };

  return (
    <div>
      <Timer>
        {({ getTime }) => (
          <Card
            title="Novo atendimento"
            extra={
              <div style={{ fontSize: 20 }}>
                <Hours formatValue={(value) => `${value}hr `} />
                <Minutes formatValue={(value) => `${value}min `} />
                <Seconds formatValue={(value) => `${value}s`} />
              </div>
            }
          >
            <Form layout={'vertical'} onFinish={createNewAppointment}>
              <Row gutter={16}>
                <Col lg={12} xs={24}>
                  <Card title="Queixas do paciente">
                    <Item name="complaints">
                      <TextArea rows={11} />
                    </Item>
                  </Card>
                </Col>
                <Col lg={12} xs={24}>
                  <Card title="Procedimentos" style={{ minHeight: 383 }}>
                    <Table dataSource={procedures}>
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
                        title="Duração de tratamento"
                        dataIndex="time"
                        key="time"
                        render={(time: number) => (
                          <div>{formatSecondsToTime(time)}</div>
                        )}
                      />
                      <Column
                        title="Ações"
                        key="action"
                        render={(_: string, record: Procedure) => (
                          <Button onClick={() => removeProcedure(record.name)}>
                            Remover procedimento
                          </Button>
                        )}
                      />
                    </Table>
                    <Button
                      style={{ width: '100%', marginTop: 15 }}
                      type="primary"
                      onClick={switchModal}
                    >
                      Adicionar procedimento
                    </Button>
                    <Modal
                      title="Criar novo procedimento"
                      visible={modalVisible}
                      onCancel={switchModal}
                      onOk={() => {
                        modalForm.validateFields().then((values) => {
                          addNewProcedure(values);
                          modalForm.resetFields();
                          switchModal();
                        });
                      }}
                      okText="Adicionar procedimento"
                      cancelText="Cancelar"
                    >
                      <Form form={modalForm} onFinish={addNewProcedure}>
                        <Item
                          name="name"
                          label="Nome"
                          rules={[
                            {
                              required: true,
                              message:
                                'Por favor, digite um nome para o procedimento',
                            },
                          ]}
                        >
                          <Input />
                        </Item>
                        <Item
                          name="cost"
                          label="Custo (R$)"
                          rules={[
                            {
                              required: true,
                              message:
                                'Por favor, digite um custo parar o procedimento',
                            },
                          ]}
                        >
                          <InputNumber style={{ width: '100%' }} />
                        </Item>
                        <Item
                          name="time"
                          label="Tempo de tratamento (Em horas)"
                          rules={[
                            {
                              required: true,
                              message:
                                'Por favor, digite a quatidade de horas do tratamento',
                            },
                          ]}
                        >
                          <InputNumber style={{ width: '100%' }} />
                        </Item>
                      </Form>
                    </Modal>
                  </Card>
                </Col>
              </Row>
              <Item style={{ marginTop: 20 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => setTime(Math.floor(getTime() / 1000))}
                >
                  Finalizar atendimento
                </Button>
              </Item>
            </Form>
          </Card>
        )}
      </Timer>
    </div>
  );
};

export default NewAppointments;
