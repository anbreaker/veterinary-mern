import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <>
      <main className="container mx-auto md:grid md:grid-cols-2 mt-12 gap-20 p-3 items-center">
        <Outlet />
      </main>
    </>
  );
};
