import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthLayout } from './layout/AuthLayout';
import { ConfirmAccount, ForgotPassword, Login, Register } from './pages/index';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/confirm-account" element={<ConfirmAccount />} />
          <Route path="/forgot-password/:id" element={<ForgotPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
