import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { Alert } from '../components/Alert';
import { axiosClient } from '../config/axios';

export const ConfirmAccount = () => {
  const [confirmAccount, setConfirmAccount] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({});

  const { token } = useParams();

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `/veterinarians/ack/${token}`;

        const { data } = await axiosClient.get(url);

        setAlert({ msg: data.msg, error: false });

        setTimeout(() => {
          setConfirmAccount(true);
        }, 2000);
      } catch (error) {
        setAlert({ msg: error.response.data.msg, error: true });
      }

      setLoading(false);
    };

    confirmAccount();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-indigo-200 font-black text-6xl">
          Confirm your Account and Manage your {''}
          <span className="text-orange-600">Patients</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-cyan-900">
        {!loading && (
          <div>
            <Alert alert={alert} />
            <p className="text-center uppercase text-white d-flex">
              Waiting for automatic redirect... <span class="loader"></span>
            </p>
          </div>
        )}

        {confirmAccount && <Navigate to={'/'} />}
      </div>
    </>
  );
};
