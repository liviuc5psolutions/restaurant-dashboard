import React from 'react';
import { Form, Input, Button } from 'antd';
import Title from 'antd/lib/typography/Title';
import ApiService from "../services/api";

export interface TableItem {
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

export interface AddFormProps {
    entity: string;
    model: TableItem | null;
    refresh: () => void;
}

export const AddForm: React.FC<AddFormProps> = ({ entity, model , refresh}) => {

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        fetchProducts(values);
    };

    const fetchProducts = (values:any) => {
        ApiService.post(`/${entity}`, values)
            .then(()=> {
            refresh();
        })
    }

    const renderForm = () => {

        let keys = model && Object.keys(model);

        // @ts-ignore
        return (
            keys?.length && keys.map((key, index) => (
                <Form.Item
                    key={index}
                    label={key.includes('_') ? key.replace(/_/g, ' ') : key}
                    name={key}
                >
                    <Input placeholder={'input'} />
                </Form.Item>
            ))
        );
    };

    return (
        <Form
            name={entity}
            className={`${entity}-form ant-form-vertical`}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            <Title level={5}>Add new {entity}</Title>
            <div className="padding">

                {model && renderForm()}

                <Form.Item>
                    <Button type="primary" htmlType="submit" shape={'round'} size={'middle'}
                            className={`create-${entity}-form-button`}>
                        Adauga produsul
                    </Button>
                </Form.Item>
            </div>
        </Form>
    );
};

