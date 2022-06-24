import React, {useEffect, useState} from 'react';
import ApiService from "../../services/api";
import { AppPage } from '../../components';
import {Col, Row} from 'antd';
import './Orders.scss';

export const Orders: React.FC = () => {
  const [isOrdersFetched, setIsOrderFetched] = useState(false);
  const [orders, setOrders] = useState<any>(undefined);

  useEffect(()=> {
    if(!isOrdersFetched) {
      fetchActiveOrders()
    }

    // setTimeout(()=> fetchActiveOrders(), 10000);
  });

  const fetchActiveOrders = () => {
    ApiService.get(`/orders`).then((r) => {
      setOrders(r.data);
      setIsOrderFetched(true);
    })
  }

  const orderComplete = (id:any) => {
    ApiService.post(`/table/${id}/order/complete`,{}).then((r) => {
      fetchActiveOrders();
    })
  }

  return (
      <AppPage title="Orders">
        <div className="order">
          <Row justify="center">
            {typeof orders === 'object' ? Object.keys(orders).map((el:any, index:any) => (
              <Col className="card-order" span={20} key={index} onClick={()=>orderComplete(el)}>
                <div className="title">Masa : {el}</div>
                {orders[el].map((product:any,index:any) => (
                  <Row>
                    <Col>{product.name}</Col>
                  </Row>
                ))}
              </Col>
            )): orders}
          </Row>
        </div>
      </AppPage>
  );
};
