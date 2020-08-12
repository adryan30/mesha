import React from 'react';
import { Layout, Menu, Typography } from 'antd';
import {
  UserOutlined,
  HomeOutlined,
  MedicineBoxOutlined,
} from '@ant-design/icons';

import Logo from '../assets/logo.png';
import Routes from './routes';
import { Link } from 'react-router-dom';

const { Title } = Typography;
const { Header, Content, Sider, Footer } = Layout;

export const App = () => {
  return (
    <Layout style={{ height: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div
          className="logo"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img src={Logo} alt="Logo do App" style={{ maxHeight: 70 }} />
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/patients">Pacientes</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<MedicineBoxOutlined />}>
            <Link to="/appointments">Atendimentos</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          className="site-layout-sub-header-background"
          style={{
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Title style={{ color: 'white', marginTop: 15 }}>Dashboard</Title>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Routes></Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          ©2020 Criado por Adryan Almeida
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
