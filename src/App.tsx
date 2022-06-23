import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Loading } from './components';
import { AppLayout } from './layouts';
import {
  Dashboard,
  Account,
  Tables,
  Products,
  Widgets,
} from './pages';
import { Orders } from './pages/orders/Orders';
import ApiService from './services/api';

ApiService.init('https://restaurant-backend.local.test/api')

export const App: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          {/*------------------------------------------------------------------*/}
          {/* Available only if the user is LOGGED IN                          */}
          {/*------------------------------------------------------------------*/}
          <Route path="/" element={<AppLayout />}>

            <Route index element={<Dashboard />} />
            <Route path="tables" element={<Tables />} />
            <Route path="products" element={<Products />} />
          </Route>
          <Route path="orders" element={<Orders />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};
