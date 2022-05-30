import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Alert } from '../components/Alert';
import { axiosClient } from '../config/axios';
import { useAuth } from '../hooks/useAuth';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({});

  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const handelFormSubmit = async (event) => {
    event.preventDefault();

    if ([email, password].includes('')) {
      setAlert({ msg: 'Please fill all the fields', error: true });

      return;
    }

    try {
      const { data } = await axiosClient.post('/veterinarians/login', {
        email,
        password,
      });

      localStorage.setItem('token', data.token);

      setAuth(data);

      navigate('/admin');
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
          Login and Manage yours {''}
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
          <div className="my-5">
            <label className="uppercase text-indigo-200 font-bold text-xl block">
              Password
            </label>
            <input
              className="border w-full p-3 mt-3 bg-gray-100 rounded-xl"
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <input
            type="submit"
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl font-bold text-slate-100 uppercase mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
            value="Init session"
          />
        </form>

        <nav className="mt-5 lg:flex lg:justify-between">
          <Link
            className="block text-center my-5 text-gray-300 hover:text-orange-600"
            to="/register"
          >
            Don't have an account? Register here.
          </Link>
          <Link
            className="block text-center my-5 text-gray-300 hover:text-orange-600"
            to="/forgot-password/:id"
          >
            Forgot your password? Click here...
          </Link>
        </nav>
      </div>
    </>
  );
};
