import { useState, useEffect, createContext } from 'react';

import { axiosClient } from '../config/axios';

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const { children } = props;

  const [auth, setAuth] = useState({});

  useEffect(() => {
    const authenticateUser = async () => {
      const token = localStorage.getItem('token');

      if (!token) return;

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
    };
    authenticateUser();
  }, []);

  return (
    <>
      <AuthContext.Provider
        value={{
          auth,
          setAuth,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};
