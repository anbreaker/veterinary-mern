import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { Alert } from '../components/Alert';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const [alert, setAlert] = useState({});

  const handelFormSubmit = (event) => {
    event.preventDefault();

    if ([name, email, password, password2].includes('')) {
      setAlert({ msg: 'Please fill all the fields', error: true });

      return;
    }

    if (password !== password2) {
      setAlert({ msg: 'Passwords do not match', error: true });

      return;
    }

    if (password.length < 6) {
      setAlert({ msg: 'Password must be at least 6 characters long', error: true });

      return;
    }

    setAlert({});

    createUser();
  };

  const createUser = async () => {
    const url = 'http://localhost:4000/api/veterinarians/register';
    try {
      const response = await axios.post(url, { name, email, password });

      setAlert({
        msg: 'User created successfully, please check your email',
        error: false,
      });
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
          Create your Account and {''}
          <span className="text-orange-600">Manage</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-cyan-900">
        {msg && <Alert alert={alert} />}

        <form onSubmit={handelFormSubmit}>
          <div className="my-5">
            <label className="uppercase text-indigo-200 font-bold text-xl block">
              Name
            </label>
            <input
              className="border w-full p-3 mt-3 bg-gray-100 rounded-xl"
              type="text"
              placeholder="Enter your Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
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
          <div className="my-5">
            <label className="uppercase text-indigo-200 font-bold text-xl block">
              Password
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
            value="Register your Account"
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
            to="/forgot-password/:id"
          >
            Forgot your password? Click here...
          </Link>
        </nav>
      </div>
    </>
  );
};
