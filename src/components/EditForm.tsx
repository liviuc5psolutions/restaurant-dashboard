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

export interface EditFormProps {
    entity: string;
    row: TableItem | null;
    refresh: () => void;
}


export const EditForm: React.FC<EditFormProps> = ({ entity, row , refresh}) => {

    const onFinish = (values: any) => {
        let originalKeys = row && Object.keys(row);
        let originalValues = row && Object.values(row);
        for (let value in values) {
            if (values[value] === undefined) {
                values[value] = originalValues?.length && originalKeys?.length && originalValues[originalKeys.indexOf(value)];
            }
        }
        console.log('Received values of form: ', values);
        fetchProducts(values);
    };

    const fetchProducts = (values:any) => {
        ApiService.put(`/${entity}/${values?.id}`, values)
            .then(()=> {
                refresh();
        });
    }

    const renderForm = () => {

        let keys = row && Object.keys(row);
        let values = row && Object.values(row);

        return (
            keys?.length && keys.map((key, index) => (
                <Form.Item
                    key={index}
                    label={key.includes('_') ? key.replace(/_/g, ' ') : key}
                    name={key}
                >
                    <Input
                        placeholder={key === 'id' ? `${row?.id}` : key === 'uuid' ? `${row?.uuid}` : values && values.length && values[index] ? values[index] : 'input'}
                        disabled={key === 'id' || key === 'uuid'} />
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
            <Title level={5}>Edit {row?.name}'s {entity} details</Title>
            <div className={'padding'}>

                {row && renderForm()}

                <Form.Item>
                    <Button type="primary" htmlType="submit" shape={'round'} size={'middle'}
                            className={`edit-${entity}-form-button`}>
                        Modifica {row?.name} 's {entity}
                    </Button>
                </Form.Item>
            </div>
        </Form>
    );
};
