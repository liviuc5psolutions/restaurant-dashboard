import React, {useEffect, useState} from 'react';
import ApiService from "../../services/api";
import { priceConverter } from '../../services/priceConverter';
import { AppPage } from '../../components';
import {Button, Col, Drawer, Modal, Row, Table, TablePaginationConfig} from 'antd';
import { EditForm } from '../../components/EditForm';
import { AddForm } from '../../components/AddForm';
import Icon, { DeleteOutlined } from '@ant-design/icons';

export const Tables: React.FC = () => {
  const [fetchedTables, setFetchedTables] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [data, setData] = useState<any[]|[]>([]);
  const [productsOnTable, setProductsOnTable] = useState<any>([]);
  const [selectedTable, setSelectedTable] = useState<any>(null);

  useEffect(()=> {
    if(!fetchedTables) {
      fetchTables();
      setFetchedTables(true);
    }
  }, []);

  const fetchTables = () => {
    ApiService.get('/tables-all').then((r)=> {
      setData(r.data);
    })
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Stare',
      dataIndex: 'status',
      key: 'status',
      render: (e:any,row:any) => row.status === 'busy' ? 'Ocupata' : 'Libera'
    },
    {
      title: 'Vezi Produse',
      dataIndex: 'details',
      key: 'details',
      render: (action: string, row: any, index: number) => <Button color="danger"
                                                                   onClick={(e: any) => viewProductsOnTable({ action, row, index }, e)}>Vezi Masa</Button>
    },
  ];

  const openAddProductDrawer = () => {
    ApiService.post(`/table`,{}).then(() => {
      fetchTables();
    })
  };

  const fetchProduct = (id:any) => {
    ApiService.get(`/table/${id}`).then((r) => {
      if(r.data.length) {
        // @ts-ignore
        let deDuplicate: any = [...new Set(r.data.map((d: any) => d.id))].map((id: any) => {
          return {
            id,
            price: r.data.filter((d: any) => d.id === id).map((d: any) => d.price),
            name: r.data.filter((d: any) => d.id === id).map((d: any) => d.name),
            tva_group: r.data.filter((d: any) => d.id === id).map((d: any) => d.tva_group),
          }
        })

        let total: any = null;
        deDuplicate = deDuplicate.map((el: any) => {
          total += Number(el.price[0]) * Number(el.name.length)
          return {
            id: el.id,
            name: el.name[0],
            qty: el.name.length,
            price: el.price[0],
            tva_group: el.tva_group[0],
          }
        })

        deDuplicate.total = priceConverter(total);
        setProductsOnTable(deDuplicate)
      }
      fetchTables();
      setIsModalVisible(true);
    }).catch((e:any)=>{
      setIsModalVisible(false);
      fetchTables();
    })
  }

  const viewProductsOnTable = (props: {action: string, row: any, index: number}, e: MouseEvent) => {
    e.preventDefault();

    if (props && props.row) {
      setSelectedTable(props.row?.id);
      fetchProduct(props.row?.id);
    }
  };

  const onCancelModal = () => {
    setProductsOnTable([]);
    setIsModalVisible(false);
    setSelectedTable(null)
  };

  const onOkModal = () => {

  }

  const removeProductFromOrder = (id:any) => {
    ApiService.post(`/table/${selectedTable}/order/remove-item`, {product_id:id}).then((r)=> {
      fetchProduct(selectedTable);
    })
  }

  return (
      <AppPage title="Tables">
        <Button
            style={{
              margin: '50px',
              left: '82%'}}
            onClick={() => openAddProductDrawer()}>
          Adauga Masa
        </Button>

        <Table style={{ padding: '25px'}} dataSource={data} columns={columns} bordered scroll={{ x: true }} />
        <Modal visible={isModalVisible} onCancel={onCancelModal} title="Produse Comandate" footer={
          <div>
          <Button onClick={onCancelModal}>Inchide</Button>
          <Button onClick={onOkModal}>Aplica Schimbarile</Button>
          </div>
        }>
          {productsOnTable?.map((product:any, index:any)=> (
            <Row key={index}>
              <Col span={8}>{product?.name}</Col>
              <Col span={6}>{product?.qty}X<strong> {priceConverter(product?.price)} Lei =</strong></Col>
              <Col span={6}>{product?.qty * priceConverter(product.price)} Lei</Col>
              <Col span={4}><DeleteOutlined onClick={() => removeProductFromOrder(product.id)}/></Col>
            </Row>
          ))}
          <Row>
            Total: {productsOnTable.total} Lei
          </Row>
        </Modal>
      </AppPage>
  );
};
