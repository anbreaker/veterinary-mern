import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';

import { Alert } from '../components/Alert';
import { axiosClient } from '../config/axios';

export const NewPassword = () => {
  const [alert, setAlert] = useState({});
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [tokenValid, setTokenValid] = useState(false);
  const [confirmPassword, setconfirmPassword] = useState(false);

  const { token } = useParams();

  useEffect(() => {
    const confirmToken = async () => {
      const url = `/veterinarians/forgot-password/${token}`;
      try {
        await axiosClient.get(url);

        setAlert({
          msg: 'Enter your new Password',
          error: false,
        });

        setTokenValid(true);
      } catch (error) {
        console.error(error.response.data.msg);

        setAlert({
          msg: 'Token is invalid or expired, please try again',
          error: true,
        });
      }
    };
    confirmToken();
  }, []);

  const handelFormSubmit = async (event) => {
    event.preventDefault();

    if (password.length < 6 || (password2.length < 6 && password !== password2)) {
      setAlert({
        msg: 'Password must be at least 6 characters anb be equal to the confirm password',
        error: true,
      });

      return;
    }

    try {
      const url = `/veterinarians/forgot-password/${token}`;

      const { data } = await axiosClient.post(url, { password });

      console.log(data);

      setAlert({
        msg: data.msg,
        error: false,
      });

      setTimeout(() => {
        setconfirmPassword(true);
      }, 1500);
    } catch (error) {
      console.error(error.response.data.msg);

      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alert;

  return (
    <>
      <div>
        <h1 className="text-indigo-200 font-black text-6xl">
          Reset your account and don't lose your {''}
          <span className="text-orange-600">Patients</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-cyan-900">
        {msg && <Alert alert={alert} />}
        {tokenValid && (
          <form onSubmit={handelFormSubmit}>
            <div className="my-5">
              <label className="uppercase text-indigo-200 font-bold text-xl block">
                New Password
              </label>
              <input
                className="border w-full p-3 mt-3 bg-gray-100 rounded-xl"
                type="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="my-5">
              <label className="uppercase text-indigo-200 font-bold text-xl block">
                Confirm your new Password
              </label>
              <input
                className="border w-full p-3 mt-3 bg-gray-100 rounded-xl"
                type="password"
                placeholder="Repeat your Password again."
                value={password2}
                onChange={(event) => setPassword2(event.target.value)}
              />
            </div>

            <input
              type="submit"
              className="bg-indigo-700 w-full py-3 px-10 rounded-xl font-bold text-slate-100 uppercase mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
              value="Reset your Password"
            />
          </form>
        )}

        {confirmPassword && <Navigate to={'/'} />}
      </div>
    </>
  );
};
