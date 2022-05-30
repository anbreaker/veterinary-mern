import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthLayout } from './layout/AuthLayout';
import {
  ConfirmAccount,
  ForgotPassword,
  Login,
  NewPassword,
  Register,
} from './pages/index';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ack/:token" element={<ConfirmAccount />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/forgot-password/:token" element={<NewPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
