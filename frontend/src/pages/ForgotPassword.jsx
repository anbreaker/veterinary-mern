import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Alert } from '../components/Alert';
import { axiosClient } from '../config/axios';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState({});

  const handelFormSubmit = async (event) => {
    event.preventDefault();

    if (email === '') {
      setAlert({ msg: 'Please fill all the fields', error: true });

      return;
    }

    try {
      const url = `/veterinarians/forgot-password`;

      const { data } = await axiosClient.post(url, { email });

      setAlert({
        msg: data.msg,
        error: false,
      });
    } catch (error) {
      console.log(error.response.data.msg);

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
          Recover your account and don't lose your {''}
          <span className="text-orange-600">Patients</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-cyan-900">
        {msg && <Alert alert={alert} />}

        <form onSubmit={handelFormSubmit}>
          <div className="my-5">
            <label className="uppercase text-indigo-200 font-bold text-xl block">
              Email
            </label>
            <input
              className="border w-full p-3 mt-3 bg-gray-100 rounded-xl"
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <input
            type="submit"
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl font-bold text-slate-100 uppercase mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
            value="Recover Account"
          />
        </form>

        <nav className="mt-5 lg:flex lg:justify-between">
          <Link
            className="block text-center my-5 text-gray-300 hover:text-orange-600"
            to="/"
          >
            You already have an account, Login.
          </Link>
          <Link
            className="block text-center my-5 text-gray-300 hover:text-orange-600"
            to="/register"
          >
            Don't have an account? Register here.
          </Link>
        </nav>
      </div>
    </>
  );
};
