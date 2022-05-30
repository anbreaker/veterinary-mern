import { Link } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

export const Header = () => {
  const { logout } = useAuth();

  return (
    <>
      <header className="py-10 bg-cyan-900">
        <div className="container mx-auto px-5 flex flex-col lg:flex-row justify-between items-center">
          <h1 className="font-bold text-2xl text-indigo-200 text-center">
            Veterinary Clinic Patient <span className="text-white">Manager</span>
          </h1>

          <nav className="flex gap-4 flex-col items-center lg:flex-row mt-5 lg:mt-0">
            <Link
              to="/admin"
              className="text-white text-sm uppercase font-bold hover:text-indigo-500"
            >
              Patients
            </Link>
            <Link
              to="/veterinarians/profile"
              className="text-white text-sm uppercase font-bold hover:text-indigo-500"
            >
              Profile
            </Link>

            <button
              type="button"
              className="text-white text-sm uppercase font-bold hover:text-indigo-500"
              onClick={logout}
            >
              Logout
            </button>
          </nav>
        </div>
      </header>
    </>
  );
};
