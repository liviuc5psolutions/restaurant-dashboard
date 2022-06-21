import React from 'react';
import { Layout } from 'antd';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AppHeader, SideMenu } from './components';
import './AppLayout.scss';


const { Content } = Layout;


export const AppLayout: React.FC = () => {
  const location = useLocation();

  return (
    <Layout hasSider className="AppLayout">
      <AppHeader />
      <Layout hasSider style={{ marginTop: 64, overflow:'auto' }}>
        <SideMenu />
        <Layout className="content-layout">
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
