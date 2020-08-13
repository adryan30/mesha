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
  Space,
  InputNumber,
} from 'antd';
import { Procedure, Appointment } from '@mesha/interfaces';
import { ModalData } from './utils';
import Timer from 'react-compound-timer';
import { convertSecondsToTime } from '../Appointments/utils';
import { api } from '../../../utils/api';
const { TextArea } = Input;

const NewAppointments: React.FC = () => {
  const history = useHistory();
  const { id } = useParams();
  const [modalForm] = Form.useForm();
  const [time, setTime] = useState<number>();
  const [visible, setVisible] = useState(false);
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const switchModal = () => setVisible(!visible);

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => <p>{name}</p>,
    },
    {
      title: 'Custo',
      dataIndex: 'cost',
      key: 'cost',
      render: (cost: number) => <p>R$ {cost.toFixed(2).replace('.', ',')}</p>,
    },
    {
      title: 'Duração de tratamento',
      dataIndex: 'time',
      key: 'time',
      render: (time: number) => <p>{convertSecondsToTime(time)}</p>,
    },
    {
      title: 'Ações',
      key: 'action',
      render: (_: string, record: Procedure) => (
        <Space size="middle">
          <Button onClick={() => handleRemove(record.name)}>
            Remover procedimento
          </Button>
        </Space>
      ),
    },
  ];

  const handleOk = (values) => {
    const modalData = values as ModalData;
    if (procedures.some((procedure) => procedure.name === modalData.name)) {
      return message.error('Esse procedimento já existe');
    }
    const procedureCost = Number(modalData.cost);
    const procedureTime = modalData.time * 3600;
    const newProcedure: Procedure = {
      name: modalData.name,
      time: procedureTime,
      cost: procedureCost,
    };
    setProcedures([...procedures, newProcedure]);
  };

  const handleRemove = (name) =>
    setProcedures(procedures.filter((procedure) => procedure.name !== name));

  const onFinish = (values: {
    complaints: string;
    procedures: Procedure[];
  }) => {
    const totalCost = procedures
      .map((procedure) => procedure.cost)
      .reduce((previous, current) => previous + current);
    const totalTime = procedures
      .map((procedure) => procedure.time)
      .reduce((previous, current) => previous + current);

    const appointmentData: Appointment = {
      id: undefined,
      patient: id,
      appointmentTime: time,
      complaints: values.complaints,
      procedures: procedures,
      totalCost,
      totalTime,
    };
    api.post('/appointment', appointmentData).then((response) => {
      if (response.status === 201) {
        return history.push('/appointments');
      }
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
                <Timer.Hours formatValue={(value) => `${value}hr `} />
                <Timer.Minutes formatValue={(value) => `${value}min `} />
                <Timer.Seconds formatValue={(value) => `${value}s`} />
              </div>
            }
          >
            <Form layout={'vertical'} onFinish={onFinish}>
              <Row gutter={16}>
                <Col lg={12} xs={24}>
                  <Card title="Queixas do paciente">
                    <Form.Item name="complaints">
                      <TextArea rows={11} />
                    </Form.Item>
                  </Card>
                </Col>
                <Col lg={12} xs={24}>
                  <Card title="Procedimentos" style={{ minHeight: 383 }}>
                    <Table columns={columns} dataSource={procedures} />
                    <Button
                      style={{ width: '100%', marginTop: 15 }}
                      type="primary"
                      onClick={switchModal}
                    >
                      Adicionar procedimento
                    </Button>
                    <Modal
                      title="Criar novo procedimento"
                      visible={visible}
                      onCancel={switchModal}
                      onOk={() => {
                        modalForm.validateFields().then((values) => {
                          handleOk(values);
                          modalForm.resetFields();
                          switchModal();
                        });
                      }}
                      okText="Adicionar procedimento"
                      cancelText="Cancelar"
                    >
                      <Form form={modalForm} onFinish={handleOk}>
                        <Form.Item
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
                        </Form.Item>
                        <Form.Item
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
                        </Form.Item>
                        <Form.Item
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
                        </Form.Item>
                      </Form>
                    </Modal>
                  </Card>
                </Col>
              </Row>
              <Form.Item style={{ marginTop: 20 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => setTime(Math.floor(getTime() / 1000))}
                >
                  Finalizar atendimento
                </Button>
              </Form.Item>
            </Form>
          </Card>
        )}
      </Timer>
    </div>
  );
};

export default NewAppointments;
