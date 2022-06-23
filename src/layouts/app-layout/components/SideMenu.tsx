import React from 'react';
import {
  HomeOutlined,
  CodeOutlined,
  SettingOutlined,
  ShopOutlined,
  TeamOutlined,
  UnorderedListOutlined,
  UserSwitchOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { useWindowSize } from 'react-use';


const { Sider } = Layout;


export const SideMenu: React.FC = () => {
  const { pathname } = useLocation();
  const rootPath = pathname.split('/')[1];
  const isMobile = useWindowSize().width < 786;

  return (
    <Sider theme="light" width={!isMobile ? 250 : '100vw'} hidden={isMobile} className="sider">
      <Menu className="side-menu" mode="inline" selectedKeys={[pathname, rootPath]}>
        <Menu.Item key="/" icon={<HomeOutlined />}>
          <Link to="/">
            Acasa
          </Link>
        </Menu.Item>

        <Menu.Item key="/products" icon={<UnorderedListOutlined />}>
          <Link to="/products">
            Produse
          </Link>
        </Menu.Item>

        <Menu.Item key="/tables" icon={<TeamOutlined />}>
          <Link to="/tables">
            Mese
          </Link>
        </Menu.Item>

        <Menu.Item key="/orders" icon={<CodeOutlined />}>
          <Link to="/orders">
            Comenzi
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
