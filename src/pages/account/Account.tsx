import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AccountSettings } from './AccountSettings';
import { AccountUsers } from './AccountUsers';


export const Account: React.FC = () => {
  return (
    <Routes>
      <Route path="settings" element={<AccountSettings />} />
      <Route path="users" element={<AccountUsers />} />
    </Routes>
  );
};
