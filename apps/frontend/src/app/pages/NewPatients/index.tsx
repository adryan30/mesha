import React, { useState } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  DatePicker,
  Upload,
  message as toaster,
} from 'antd';
import { useHistory } from 'react-router-dom';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import {
  api,
  checkIfFileIsImage,
  imageToBase64,
  apiURL,
  formLayout,
  formActionsLayout,
} from '@mesha/shared';
import { PatientFormData, AvatarFile } from '@mesha/interfaces';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';

const { Item } = Form;

/**
 * Essa página é composta de elementos de entrada de dados (Input, DatePicker e Upload)
 * Seu objetivo é realizar o cadastro de um novo paciente no sistema.
 */
const NewPatients: React.FC = () => {
  const history = useHistory();
  const [imageUrl, setImageUrl] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = (values: PatientFormData) => {
    api
      .post('/patient', {
        name: values.name,
        email: values.email,
        phone: values.phone,
        birthday: values.birthday.format('YYYY-MM-DD'),
        photo: values.photo.file.response.filename,
      })
      .then((response) => {
        if (response.status === 201) {
          history.push('/appointments');
        }
      })
      .catch(() => {
        toaster.error(
          'Ocorreu um erro ao cadastrar o usuário, tente novamente'
        );
      });
  };

  /**
   * Esse método gerencia o estado local com o objetivo de apresentar uma "thumbnail" da imagem enviada
   * @param avatarFile Informações sobre o estado atual da imagem enviada
   */
  const handleAvatarChange = (
    avatarFile: UploadChangeParam<UploadFile<AvatarFile>>
  ) => {
    if (avatarFile.file.status === 'uploading') return setLoading(true);
    if (avatarFile.file.status === 'done') {
      imageToBase64(avatarFile.file.originFileObj, (imageUrl: string) => {
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
        <Form {...formLayout} name="newPatient" onFinish={onSubmit}>
          <Item
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
          </Item>
          <Item
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
          </Item>
          <Item
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
          </Item>
          <Item
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
          </Item>
          <Item
            {...formLayout}
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
              action={`${apiURL}/upload`}
              beforeUpload={checkIfFileIsImage}
              onChange={handleAvatarChange}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </Item>
          <Item {...formActionsLayout}>
            <Button type="primary" htmlType="submit">
              Criar paciente
            </Button>
          </Item>
        </Form>
      </Card>
    </div>
  );
};

export default NewPatients;
