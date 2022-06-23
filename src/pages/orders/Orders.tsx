import React from 'react';
import ApiService from "../../services/api";
import { AppPage } from '../../components';

export const Orders: React.FC = () => {
  const onOkModal = (table:any) => {
    ApiService.post(`/table/${table}/order/complete`, {}).then((r) => {
      // fetchOrders();
    })
  }

  return (
      <AppPage title="Tables">
        //
      </AppPage>
  );
};
