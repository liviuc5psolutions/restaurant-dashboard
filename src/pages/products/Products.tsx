import React, {useEffect, useState} from 'react';
import ApiService from "../../services/api";
import { priceConverter } from '../../services/priceConverter';
import { AppPage } from '../../components';
import { Button, Drawer, Table, TablePaginationConfig } from 'antd';
import { EditForm } from '../../components/EditForm';
import { AddForm } from '../../components/AddForm';

interface TableItem {
  [x: string]: any;

  id?: number,
  category: string,
  description: string,
  image_path: string,
  name: string,
  price: string,
  quantity: string,
  tva_group: number,
}

interface RowType {
  action: string;
  row?: TableItem;
  index: number;
}

export const defaultProduct: TableItem = {
  name: '',
  category: '',
  description: '',
  image_path: '',
  price: '',
  quantity: '',
  tva_group: 1,
};

export const Products: React.FC = () => {
  const [pageSize, setPageSize] = useState(10);
  const [addProduct, setAddProduct] = useState<TableItem | null>(null);
  const [editProduct, setEditProduct] = useState<TableItem | null>(null);
  const [fetchedProduct, setFetchedProduct] = useState(false);

  const [data, setData] = useState<TableItem[]|[]>([]);

  useEffect(()=> {
    if(!fetchedProduct) {
      fetchProducts();
      setFetchedProduct(true);
    }
  }, []);

  const fetchProducts = () => {
    ApiService.get('/products-all').then((r)=> {
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
      title: 'Nume Produs',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Categorie',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Descriere',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Imagine',
      dataIndex: 'image_path',
      key: 'image_path',
    },
    {
      title: 'Pret',
      dataIndex: 'price',
      key: 'price',
      render: (price:string) => <p>{priceConverter(price)}Lei</p>
    },
    {
      title: 'Cantitate',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Grup Tva',
      dataIndex: 'tva_group',
      key: 'tva_group',
    },
    {
      title: 'Modifica Produs',
      dataIndex: 'edit',
      key: 'edit',
      render: (action: string, row: any, index: number) => <Button
          onClick={(e: any) => openEditProductDrawer({ action, row, index }, e)}>Modifica</Button>
    },
    {
      title: 'Sterge Produs',
      dataIndex: 'delete',
      key: 'delete',
      render: (action: string, row: any, index: number) => <Button color="danger"
          onClick={(e: any) => deleteProduct({ action, row, index }, e)}>Sterge</Button>
    },
  ];

  const pagination: TablePaginationConfig = {
    position: ['bottomRight'],
    pageSize: pageSize
  };

  const openAddProductDrawer = () => {
    setAddProduct(defaultProduct);
  };

  const closeAddProductDrawer = () => {
    setAddProduct(null);
  };

  const openEditProductDrawer = (props: RowType, e: MouseEvent) => {
    e.preventDefault();
    if (props && props.row) {
      setEditProduct(props.row);
    }
  };

  const deleteProduct = (props: RowType, e: MouseEvent) => {
    e.preventDefault();

    if (props && props.row) {
      ApiService.delete(`/product/${props.row?.id}`).then(() => {
        fetchProducts();
      })
    }
  };

  const closeEditProductDrawer = () => {
    setEditProduct(null);
  };

  return (
    <AppPage title="Products">

      <Button
          style={{
            margin: '50px',
            left: '82%'}}
          onClick={() => openAddProductDrawer()}>
        Adauga Produs
      </Button>

      <Table style={{ padding: '25px'}} dataSource={data} columns={columns} pagination={pagination} bordered scroll={{ x: true }} />
      <Drawer onClose={closeAddProductDrawer} visible={!!addProduct}>
        <AddForm key={'product'} entity={'product'} model={addProduct} refresh={fetchProducts}></AddForm>
      </Drawer>

      <Drawer onClose={closeEditProductDrawer} visible={!!editProduct}>
        <EditForm key="product" entity={'product'} row={editProduct} refresh={fetchProducts}/>
      </Drawer>
    </AppPage>
  );
};
