import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AnimatedButton from "./AnimatedButton";
import { loginRequest } from "../redux/actions/authActions";

const SigninForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    loading,
    success,
    message,
    errors: validationErrors,
  } = useSelector((state) => state.auth);

  const onSubmit = (data) => {
    dispatch(loginRequest(data.email, data.password));
  };

  /*   useEffect(() => {
    if (isLoggedIn) {
      navigate("/todos");
    }
  }, [navigate, isLoggedIn]); */

  useEffect(() => {
    if (success) {
      toast.success(message || "Logged in successfully!");
      //navigate("/teams");
    }
  }, [success, message, navigate]);

  useEffect(() => {
    if (message && !success && !loading) {
      toast.error(message);
    }
  }, [message, success, loading]);

  return (
    <div className="selection:bg-emerald-500 selection:text-white flex justify-center items-center p-8">
      <div className="flex-1 mx-auto p-8">
        <h1 className="mb-10 landscape:md:mt-40 landscape:lg:mt-0 sm:mt-24 md:mt-32 lg:mt-0 md:text-3xl lg:text-3xl xl:text-5xl 2xl:mx-0 ml-3 text-base font-bold text-emerald-600">
          Welcome back!
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.email ? "border-red-500" : ""
              }`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/i,
                  message: "Enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.password ? "border-red-500" : ""
              }`}
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password should contain at least 8 characters, with a mix of lowercase letters, uppercase letters, digits, and special symbols.",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SigninForm;
