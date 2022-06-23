import React from 'react';
import { Avatar, Badge, Dropdown, Menu, Button } from 'antd';
import { BellFilled } from '@ant-design/icons';
import { Notification } from './types';
import './NotificationsDropdown.scss';


const notifications: Notification[] = [
  // {
  //   message: 'Lorem ipsum dolor sit amet, conda navigato samicaro.',
  //   is_read: false,
  //   created_at: '2 minutes ago',
  //   created_ago: '2 minutes ago',
  // },
  // {
  //   message: 'Lorem ipsum dolor sit amet, conda navigato samicaro.',
  //   is_read: false,
  //   created_at: 'yesterday',
  //   created_ago: 'yesterday',
  // },
];


export const NotificationsDropdown: React.FC = () => {
  const notificationsCount = notifications.length;
  const hasNotifications = notificationsCount > 0;
  const hasUnreadNotifications = false;

  const markAllAsRead = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!hasNotifications) {
      return;
    }
    console.log('Mark all as read');
  };

  const menu = () => (
    <Menu className="notifications-menu" selectedKeys={['mark-all-as-read']}>
      <Menu.ItemGroup title="Notifications">
        <Menu.Item key="notifications-list" disabled className="notifications-list">
        </Menu.Item>

        <Menu.Item key="mark-all-as-read">
          <Button
            block onClick={markAllAsRead}
            disabled={hasNotifications && !hasUnreadNotifications}
            className="mark-all-btn"
          >
            {hasNotifications ? 'Mark all as read' : 'Close'}
          </Button>
        </Menu.Item>
      </Menu.ItemGroup>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
      <button>
        <Badge count={notificationsCount} size="default" showZero={false}>
          <Avatar className="notifications-avatar" size="default" icon={<BellFilled />} shape="circle" />
        </Badge>
      </button>
    </Dropdown>
  );
};
