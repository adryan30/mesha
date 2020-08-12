import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  Input,
  Form,
  Button,
  Col,
  Row,
  TimePicker,
  Table,
  Modal,
  message,
  Space,
} from 'antd';
import { Procedure, Appointment } from '@mesha/interfaces';
import { ModalData } from './utils';
import Timer from 'react-compound-timer';
import { convertSecondsToTime } from '../Appointments/utils';
const { TextArea } = Input;

const NewAppointments: React.FC = () => {
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
    if (procedures.some((val) => val.name === modalData.name)) {
      return message.error('Esse procedimento já existe');
    }
    const procedureCost = Number(modalData.cost);
    const procedureTime =
      modalData.time.hours() * 60 * 60 +
      modalData.time.minutes() * 60 +
      modalData.time.seconds();
    const newProcedure: Procedure = {
      name: modalData.name,
      cost: procedureCost,
      time: procedureTime,
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
      .map((val) => val.cost)
      .map(Number)
      .reduce((prev, curr) => prev + curr);
    const totalTime = procedures
      .map((val) => val.time)
      .reduce((prev, curr) => prev + curr);

    const appointmentData: Appointment = {
      patient: id,
      appointmentTime: time,
      complaints: values.complaints,
      procedures: procedures,
      totalCost,
      totalTime,
    };
    console.log('Success:', appointmentData);
  };

  return (
    <div>
      <Timer>
        {({ getTime }) => (
          <Card
            title="Novo atendimento"
            extra={
              <div style={{ fontSize: 20 }}>
                <Timer.Hours formatValue={(value) => `${value}:`} />
                <Timer.Minutes formatValue={(value) => `${value}:`} />
                <Timer.Seconds formatValue={(value) => `${value}`} />
              </div>
            }
          >
            <Form layout={'vertical'} onFinish={onFinish}>
              <Row gutter={16}>
                <Col span={12}>
                  <Card title="Queixas do paciente">
                    <Form.Item name="complaints">
                      <TextArea rows={4} />
                    </Form.Item>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card title="Procedimentos" style={{ minHeight: 230 }}>
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
                          label="Custo"
                          rules={[
                            {
                              required: true,
                              message:
                                'Por favor, digite um custo parar o procedimento',
                            },
                          ]}
                        >
                          <Input type="number" prefix="R$" />
                        </Form.Item>
                        <Form.Item
                          name="time"
                          label="Tempo de tratamento"
                          rules={[
                            {
                              required: true,
                              message:
                                'Por favor, digite um tempo para o procedimento',
                            },
                          ]}
                        >
                          <TimePicker showNow={false} />
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
