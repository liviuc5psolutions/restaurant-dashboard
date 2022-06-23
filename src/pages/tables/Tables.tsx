import React, {useEffect, useState} from 'react';
import './Tables.scss';
import ApiService from "../../services/api";
import {priceConverter} from '../../services/priceConverter';
import {AppPage} from '../../components';
import {Button, Col, Drawer, Modal, Row, Table} from 'antd';
import Icon, {DeleteOutlined} from '@ant-design/icons';
import {QRCodeSVG} from 'qrcode.react';

const printReceive = (text:any) => {
  const now = new Date();
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}-${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}.txt`);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

export const Tables: React.FC = () => {
  const [fetchedTables, setFetchedTables] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(undefined);
  const [fetchedProduct, setFetchedProduct] = useState(false);
  const [products, setProducts] = useState<any>(null);

  const [data, setData] = useState<any[] | []>([]);
  const [productsOnTable, setProductsOnTable] = useState<any>([]);
  const [selectedTable, setSelectedTable] = useState<any>(null);

  useEffect(() => {
    if (!fetchedTables) {
      fetchTables();
      setFetchedTables(true);
    }
    if (!fetchedProduct) {
      fetchProducts();
      setFetchedProduct(true);
    }
  }, []);

  const fetchTables = () => {
    ApiService.get('/tables-all').then((r) => {
      setData(r.data);
    })
  }

  const fetchProducts = () => {
    ApiService.get('/products').then((r) => {
      // @ts-ignore
      setCategories(Object.keys(r.data));
      setProducts(r.data);
    })
  }

  const addToTable = (product:any) => {
    ApiService.post(`table/${selectedTable}/order`, {products: [{
        id: product.id,
        name: product.name,
        qty: 1,
        price: product.price
      }]}).then((r) => {
      fetchProduct(selectedTable);
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
      render: (e: any, row: any) => row.status === 'busy' ? 'Ocupata' : row.status === 'completed' ? 'Comanda Servita' : 'Libera'
    },
    {
      title: 'Vezi Produse',
      dataIndex: 'details',
      key: 'details',
      render: (action: string, row: any, index: number) => <Button color="danger"
                                                                   onClick={(e: any) => viewProductsOnTable({
                                                                     action,
                                                                     row,
                                                                     index
                                                                   }, e)}>Vezi Masa</Button>
    },
  ];

  const openAddProductDrawer = () => {
    ApiService.post(`/table`, {}).then(() => {
      fetchTables();
    })
  };

  const fetchProduct = (id: any) => {
    ApiService.get(`/table/${id}`).then((r) => {
      if (r.data.length) {
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
    }).catch((e: any) => {
      fetchTables();
      setProductsOnTable(null);
    })
    setIsModalVisible(true);
  }

  const viewProductsOnTable = (props: { action: string, row: any, index: number }, e: MouseEvent) => {
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
    setSelectedCategory(undefined);
  };

  const onOkModal = () => {
    ApiService.post(`/table/${selectedTable}/order/fiscal`, {}).then((r) => {
      fetchProduct(selectedTable);
      setSelectedCategory(undefined);
      setIsModalVisible(false);
      setSelectedTable(null);
      setProductsOnTable([]);
      const greeting = 'TL^Multumim\n';
      const i = `I^${r.data.total}\n`;
      const isCash = window.confirm('Plata cash?');
      const paymentType = `P^${isCash ? '1' : '2'}^${r.data.total}`;
      const textToPrint = r.data.String.toString().replace(/,/g, '\n') + '\n';
      printReceive(textToPrint + greeting + i + paymentType);
    })
  }

  const onEmptyTable = () => {
    ApiService.post(`/table/${selectedTable}/order/empty`, {}).then((r) => {
      fetchProduct(selectedTable);
    })
  }

  const removeProductFromOrder = (id: any) => {
    ApiService.post(`/table/${selectedTable}/order/remove-item`, {product_id: id}).then((r) => {
      fetchProduct(selectedTable);
    })
  }

  const generateQR = () => {
    setShowQR(!showQR);
  }

  return (
    <AppPage title="Tables">
      <Button
        style={{
          margin: '50px',
          left: '82%'
        }}
        onClick={() => openAddProductDrawer()}>
        Adauga Masa
      </Button>

      <Table style={{padding: '25px'}} dataSource={data} columns={columns} bordered scroll={{x: true}}/>
      <Modal visible={isModalVisible} onCancel={onCancelModal} title="Produse Comandate" footer={<></>}>
        <Row justify="space-between">
          <Col span={16} className="meniu">
            <Row>
              {!selectedCategory ? categories.map((el,index) => (
                <Col className="card" key={index} onClick={()=> setSelectedCategory(el)
                }>
                  {el}
                </Col>
              )) : (
                <React.Fragment>
                <Row>
                  <Button className="custom-button" onClick={()=>setSelectedCategory(undefined)}>Inapoi</Button>
                </Row>
                  <Row justify="space-between">
                  {products && selectedCategory && products[selectedCategory].map((product: any, index: number) => (
                    <Col className="card-product" span={8} key={index}>
                      <Row justify="space-between">
                        <Col span={12}>
                          <Row>
                            <Col span={16}>
                              {product?.name}
                            </Col>

                            <Col span={8}>{priceConverter(product?.price)} Lei</Col>
                          </Row>
                        </Col>
                        <Col span={8}>
                          <div className="flex qty-background">
                            <Button onClick={() => addToTable(product)}>Adauga</Button>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  ))}
                  </Row>
                </React.Fragment>
              )}
            </Row>
          </Col>
          <Col className="products" span={8}>
            {productsOnTable && productsOnTable?.map((product: any, index: any) => (
              <Row key={index}>
                <Col span={8}>{product?.name}</Col>
                <Col span={6}>{product?.qty}X<strong> {priceConverter(product?.price)} Lei =</strong></Col>
                <Col span={6}>{product?.qty * priceConverter(product.price)} Lei</Col>
                <Col className="trash" span={4}><DeleteOutlined onClick={() => removeProductFromOrder(product.id)}/></Col>
              </Row>
            ))}
            <Row className="total">
              Total: {productsOnTable && productsOnTable.total} Lei
            </Row>
            {showQR ? (
              <QRCodeSVG id="qr" onClick={() => window.print()} value={`https://5-pini-frontend.netlify.app.com/${selectedTable}`}/>
            ): ''}
            <Row className="self-bottom" justify="space-between">
              <Button className="custom-button" onClick={generateQR}>QR Code</Button>
              <Button disabled={!productsOnTable} className="custom-button" onClick={onEmptyTable}>Goleste masa</Button>
              <Button disabled={!productsOnTable} className="custom-button" onClick={onOkModal}>Printeaza Bon</Button>
            </Row>
          </Col>
        </Row>
      </Modal>
    </AppPage>
  );
};
