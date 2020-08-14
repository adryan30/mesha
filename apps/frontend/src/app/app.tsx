import React from 'react';
import { Layout, Menu, Typography } from 'antd';
import {
  UserOutlined,
  HomeOutlined,
  MedicineBoxOutlined,
  TableOutlined,
} from '@ant-design/icons';

import Logo from '../assets/logo.png';
import Routes from './routes';
import { Link, useLocation } from 'react-router-dom';

const { Title } = Typography;
const { Header, Content, Sider, Footer } = Layout;
const { Item } = Menu;

export const App = () => {
  const { pathname } = useLocation();
  const getRoute = (route: string) => {
    switch (true) {
      case route.match('/csv')?.length > 0:
        return '4';
      case route.match('/appointment')?.length > 0:
        return '3';
      case route.match('/patients')?.length > 0:
        return '2';
      default:
        return '1';
    }
  };

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
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[getRoute(pathname)]}
        >
          <Item key="1" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Item>
          <Item key="2" icon={<UserOutlined />}>
            <Link to="/patients">Pacientes</Link>
          </Item>
          <Item key="3" icon={<MedicineBoxOutlined />}>
            <Link to="/appointments">Atendimentos</Link>
          </Item>
          <Item key="4" icon={<TableOutlined />}>
            <Link to="/csv">Consumidor de CSV</Link>
          </Item>
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
          <Title style={{ color: 'white', marginTop: 15 }}>PacientePlus</Title>
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
