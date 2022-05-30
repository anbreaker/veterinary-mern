import { useState, useEffect, createContext } from 'react';

import { axiosClient } from '../config/axios';

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const { children } = props;

  const [auth, setAuth] = useState({});
  const [loadAuth, setLoadAuth] = useState(true);

  useEffect(() => {
    const authenticateUser = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setLoadAuth(false);

        return;
      }

      try {
        const { data } = await axiosClient.get('/veterinarians/profile', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        setAuth(data.veterinary);
      } catch (error) {
        console.error(error.response.data.msg);

        setAuth({});
      }

      setLoadAuth(false);
    };
    authenticateUser();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');

    setAuth({});
  };

  return (
    <>
      <AuthContext.Provider
        value={{
          auth,
          setAuth,
          loadAuth,
          logout,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};
