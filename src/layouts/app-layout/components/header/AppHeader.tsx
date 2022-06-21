import React from 'react';
import { Layout } from 'antd';
import { LayoutProps as HeaderProps } from 'antd/lib/layout';
import { Link } from 'react-router-dom';
import Logo from '../../../../assets/img/logo.png';
import { NotificationsDropdown } from './notifications/NotificationsDropdown';
import './AppHeader.scss';


const { Header } = Layout;


export const AppHeader: React.FC<HeaderProps> = (props) => {

  return (
    <Header className="app-header clearfix" {...props}>
      <div className="header-container">
        <div className="header-logo">
          <Link to="/dashboard" id="logo">
            <img src={Logo} className="logo-img" alt="5Pini" />
          </Link>
        </div>
        <nav className="user-nav">
          <NotificationsDropdown />
        </nav>
      </div>
    </Header>
  );
};
