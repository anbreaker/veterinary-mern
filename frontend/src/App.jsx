import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthProvider';

import { AuthLayout } from './layout/AuthLayout';
import { ProtectedRoutes } from './layout/ProtectedRoutes';

import {
  AdminPatients,
  ConfirmAccount,
  ForgotPassword,
  Login,
  NewPassword,
  Register,
} from './pages/index';

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/ack/:token" element={<ConfirmAccount />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/forgot-password/:token" element={<NewPassword />} />
          </Route>

          <Route path="/admin" element={<ProtectedRoutes />}>
            <Route index element={<AdminPatients />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
