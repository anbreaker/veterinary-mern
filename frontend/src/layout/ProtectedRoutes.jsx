import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

export const ProtectedRoutes = () => {
  const { auth, loadAuth } = useAuth();

  return (
    <>
      {loadAuth && <span className="loader"></span>}

      <Header />

      {auth?._id ? (
        <main className="container mx-auto mt-10">
          <Outlet />
        </main>
      ) : (
        <Navigate to="/" />
      )}

      <Footer />
    </>
  );
};
