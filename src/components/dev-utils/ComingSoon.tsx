import React from 'react';
import { Row, Alert } from 'antd';
import ComingSoonImg from '../../assets/img/coming-soon.svg';


type Props = {
  title?: string
}


export const ComingSoon: React.FC<Props> = ({ title }) => {
  return (
    <div className="content-middle">
      <div>
        {title && (
          <Row justify="center" style={{ marginBottom: '40px' }}>
            <h1>{title}</h1>
          </Row>
        )}
        <Row justify="center">
          <img src={ComingSoonImg} style={{ height: '300px', maxHeight: '300px' }} alt="Coming Soon" />
        </Row>
        <Row justify="center">
          <Alert
            style={{ marginTop: '40px' }}
            message="Coming soon..."
            description="This functionality is not ready yet."
            type="info"
            showIcon
          />
        </Row>
      </div>
    </div>
  );
};
