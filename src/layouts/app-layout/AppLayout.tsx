import React, {useState} from 'react';
import {Button, Input, Layout, Modal} from 'antd';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AppHeader, SideMenu } from './components';
import './AppLayout.scss';
import Title from 'antd/lib/skeleton/Title';


const { Content } = Layout;

localStorage.setItem('defaultPass', '0000');
const password = localStorage.getItem('password');
localStorage.setItem('isDefaultPassword', password ? 'false' : 'true');

export const AppLayout: React.FC = () => {
  const location = useLocation();
  const [password, setPassword] = useState(localStorage.getItem('defaultPass'));
  const [isDefaultPassword, setIsDefaultPassword] = useState(localStorage.getItem('isDefaultPassword') === 'true');
  const [isModalVisibile, setIsModalVisible] = useState(true);
  const [error, setError] = useState('');

  const checkPass = ()=> {
    if (!isDefaultPassword) {
      if (password === localStorage.getItem('password')) {
        setIsModalVisible(false);
      } else {
        setError('Parola e gresita');
      }
    } else {
      localStorage.setItem('password', password || '');
      localStorage.setItem('isDefaultPassword', 'false');
      setIsModalVisible(false);
    }
  }

  return (
    <Layout hasSider className="AppLayout">
      <AppHeader />
      <Layout hasSider style={{ marginTop: 64, overflow:'auto' }}>
        <SideMenu />
        <Layout className="content-layout">
          <Content>
            <Outlet />
            <Modal visible={isModalVisibile} footer={<Button onClick={checkPass}>ok</Button>} title="Parola">
              <label>{isDefaultPassword ? 'Schimba Parola': 'Introdu Parola'}</label>
              <Input type="number" onChange={(e)=>{setPassword(e.target.value); setError('')}}></Input>
              <div>{error}</div>
            </Modal>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
