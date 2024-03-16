import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axios/axios";
import { AuthContext } from "../axios/authProvider";

const Login = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (auth && auth.refreshToken !== null && auth.refreshToken !== undefined) {
      navigate("/");
    }
  }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userName = e.target[0].value;
    const password = e.target[1].value;
    const userData = {
      username: userName,
      password: password,
    };
    await axios
      .post("/user/login/", userData)
      .then(function (response) {
        console.log(response);
        setAuth({
          refreshToken: response.data.refresh,
          accessToken: response.data.access,
          username: response.data.username,
        });
        console.log(auth);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="bg-gray-900 w-screen h-screen">
      <div className="flex justify-center items-center text-slate-100 w-screen h-screen">
        <div className="  border-white shadow-lg bg-[#F9DBBD] bg-opacity-10 w-[400px] max-w-[100vw] rounded p-4">
          <div className="text-xl py-2 font-bold px-4">Login</div>
          <form className="flex flex-col items-center" onSubmit={handleSubmit}>
            <div className="my-2 w-11/12">
              <input
                className="focus:outline outline-white w-full bg-transparent border border-slate-300 rounded-md py-2 px-4 placeholder-gray-500"
                type="text"
                placeholder="username"
                name="userName"
                required
              />
            </div>
            <div className="my-1 w-11/12">
              <input
                className="focus:outline outline-white w-full bg-transparent border border-gray-300 rounded-md py-2 px-4 placeholder-gray-500"
                type="password"
                placeholder="password"
                name="password"
                required
              />
            </div>
            <div className=" flex items-center flex-wrap justify-center w-full p-2 px-5">
                <div className="flex gap-2 items-center justify-center">
                    <input className="" type="checkbox"/> Remember me
                </div>
              <div className="grow bg-red-900"></div>
                <a className="text-amber-300 text-base" href="#">
                  Forgot password?
                </a>
            </div>
            <div className="mt-2 w-full flex px-4">
              <button className="grow bg-sky-950 text-white border border-grey-300 rounded-md py-2 px-4 hover:bg-cyan-700 hover:border-cyan-700 hover:text-white">
                Log in
              </button>
            </div>
            <div className="px-4 my-2 w-full">
              <div className="text-gray-700 flex gap-2 items-center px-2">
                <hr className="grow border-gray-700" />
                or
                <hr className="grow border-gray-700" />
              </div>
            </div>
            <div className=" flex w-full px-4">
              <button className="grow bg-rose-800 border border-grey-300 rounded-md py-2 px-4 hover:bg-rose-500 text-White-300 hover:text-white hover:border-rose-500">
                login with phone number
              </button>
            </div>
          </form>
          <div className="ml-4 mt-2 flex flex-wrap items-center justify-center">
            don't have an account ?
            <Link
              className=" m-1 font-medium text-amber-300 no-underline hover:text-[#535bf2]"
              to="/signup"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;