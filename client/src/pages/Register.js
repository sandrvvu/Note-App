import React, { useContext, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { LOGIN_ROUTE, HOME_ROUTE } from "../utils/const";
import { registration } from "../apiCalls/userApi";
import { Context } from "../index";
import { validLogin, validPassword } from "../utils/validation";

const Register = () => {
  const { user } = useContext(Context);
  const location = useLocation();
  const history = useHistory();
  const [error, setError] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const registrationHandler = async (event) => {
    event.preventDefault();
    try {
      if (!validLogin(login)) {
        alert("Enter a valid login address");
        setLogin("");
      } else if (!validPassword(password)) {
        alert("Password should have 4 or more characters");
        setPassword("");
      } else {
        let data = await registration(login, password);
        console.log(data);
        user.setUser(user);
        user.setIsAuth(true);
        alert("Реєстрація успішна!");
        history.push(LOGIN_ROUTE);
      }
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <div className="max-w-full max-h-screen ">
      <nav className="h-20 ">
        <div className="apear flex float-left mt-3 ">
          <Link
            to={HOME_ROUTE}
            className="px-4 py-2 mx-8 mt-5 cursor-pointer text-lg font-mono  border-2 border-gray-600 rounded-lg transform transition duration-500 hover:scale-110 hover:bg-purple-400"
          >
            Home
          </Link>
        </div>
      </nav>
      <div className="px-8 py-12 m-auto md:w-3/6 lg:w-2/6 mt-30">
        <h1 className="px-4 mb-4 text-4xl font-bold title text-center">
          Registration
        </h1>
        <form className="font-mono">
          <label>Username</label>
          <input
            className="block w-full px-3 py-2 text-gray-900 border border-purple-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
            type="login"
            placeholder="write your username..."
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <br></br>
          <label>Password</label>
          <input
            placeholder="write your password..."
            className="block w-full px-3 py-2 text-gray-900 border border-purple-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 "
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            autoComplete="on"
            className="w-full px-2 py-1 mt-4 font-medium tracking-wide text-white bg-purple-600 border border-gray-600 rounded-lg transform transition duration-500 hover:scale-110 hover:bg-purple-800"
            onClick={registrationHandler}
          >
            Sign in
          </button>
          <p className="mt-2 font-medium">
            Already have an account?{" "}
            <Link className="text-purple-800" to={LOGIN_ROUTE}>
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
