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
import ApiService from './services/api';

ApiService.init('https://restaurant-web-app.local.test/api/')

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
            <Route path="widgets" element={<Widgets />} />
            <Route path="account/*" element={<Account />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};
