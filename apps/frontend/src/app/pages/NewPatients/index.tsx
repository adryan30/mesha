import React, { useState } from 'react';
import { Card, Form, Input, Button, DatePicker, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import { getBase64, beforeUpload, layout, tailLayout } from './utils';

/**
 * Essa página é composta de elementos de entrada de dados (Input, DatePicker e Upload)
 * Seu objetivo é realizar o cadastro de um novo paciente no sistema.
 */
const NewPatients: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (values) => {
    console.log('Failed:', values);
  };

  /**
   * Esse método gerencia o estado local com o objetivo de apresentar uma "thumbnail" da imagem enviada
   * @param info Informações sobre o estado atual da imagem enviada
   */
  const handleAvatarChange = (info) => {
    if (info.file.status === 'uploading') {
      return setLoading(true);
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (imageUrl: string) => {
        setImageUrl(imageUrl);
        setLoading(false);
      });
    }
  };

  /**
   * Componente simples para representar o botão de "upload" de imagem
   */
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Selecionar imagem</div>
    </div>
  );

  return (
    <div>
      <Card title="Cadastrar novo paciente">
        <Form
          {...layout}
          name="newPatient"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Nome"
            name="name"
            rules={[
              {
                required: true,
                message: 'Por favor, digite um nome para o paciente',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Data de nascimento"
            name="birthday"
            rules={[
              {
                required: true,
                message: 'A data de nascimento é obrigatória',
              },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Por favor, digite o email do paciente',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Telefone"
            name="phone"
            rules={[
              {
                required: true,
                message: 'Por favor, digite o telefone do paciente',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            {...layout}
            label="Avatar"
            name="photo"
            rules={[
              {
                required: true,
                message: 'Por favor, insira uma foto do paciente',
              },
            ]}
          >
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleAvatarChange}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Criar paciente
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default NewPatients;
