import React from 'react';
import styled from 'styled-components';
import { Notification } from './types';


type NotificationProps = {
  notification: Notification
}

/*

TODO
  1. Show Notification messages
  2. On each notification item has a timestamp - translate it to "ago"
  3. On hover on the "ago" show the real time - localized (i.e. translate UTC to local time)
  4. If notification is read show it in gray
  5. Add side button to allow marking a notification as read/unread
  6. If there are more than 15 notices, implement infinite scroll
  7. Implement notification boxes by type e.g. "user accepted invite" might be shown differently than "report is ready"
  8. Some notifications will link to another page - add support for internal and external links
  9. Some notifications will contain a short message and then a long message. On Click - open a modal with the long message
  10. Add support for all of that in Redux, the backend, and the APIs
  11. WebSockets: Subscribe to a channel and listen to notifications in real time
*/


export const NotificationItem: React.FC<NotificationProps> = ({ notification }) => {
  return (
    <NotificationItemDiv>
      {notification.message}
    </NotificationItemDiv>
  );
};


const NotificationItemDiv = styled.div`


`;
