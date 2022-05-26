import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <>
      <h1>Veterinary Patient Management</h1>

      <Outlet />
    </>
  );
};
