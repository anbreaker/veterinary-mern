import { Link } from 'react-router-dom';

export const Login = () => {
  return (
    <>
      <div>
        <h1 className="text-indigo-200 font-black text-6xl">
          Login and Manage yours <span className="text-orange-600">Patients</span>
        </h1>
      </div>

      <div>
        <form action="">
          <div className="my-5">
            <label className="uppercase text-indigo-200 font-bold text-xl block">
              Email
            </label>
            <input
              className="border w-full p-3 mt-3 bg-gray-100 rounded-xl"
              type="email"
              placeholder="Enter your Email"
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
            />
          </div>

          <input
            type="submit"
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl font-bold text-slate-100 uppercase mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
            value="Init session"
          />
        </form>

        <nav className="mt-5 lg:flex lg:justify-between">
          <Link className="block text-center my-5 text-gray-300" to="/register">
            Don't have an account?
          </Link>
          <Link className="block text-center my-5 text-gray-300" to="/register">
            Forgot your password? Click here...
          </Link>
        </nav>
      </div>
    </>
  );
};
