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
          <Route path="/confirmaccount" element={<ConfirmAccount />} />
          <Route path="/forgotpassword/:id" element={<ForgotPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
