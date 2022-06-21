import React from 'react';
import { BellTwoTone } from '@ant-design/icons';
import styled from 'styled-components';


export const NoNotifications: React.FC = () => {
  return (
    <NoNotificationsDiv>
      <div>
        <BellTwoTone twoToneColor="#46A3A5" />

        <h3>No notifications yet</h3>
        <p>When you get notifications, they will show up here</p>
      </div>
    </NoNotificationsDiv>
  );
};

const NoNotificationsDiv = styled.div`
  padding: 40px;
  text-align: center;
  color: #555;

  .anticon {
    font-size: 36px;
  }

  h3 {
    margin-top: 20px;
  }
`;
