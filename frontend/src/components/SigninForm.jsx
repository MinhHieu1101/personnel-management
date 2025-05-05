import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
/* import { useDispatch, useSelector } from "react-redux"; */
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AnimatedButton from "./AnimatedButton";

const SigninForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  /*   useEffect(() => {
    if (isLoggedIn) {
      navigate("/todos");
    }
  }, [navigate, isLoggedIn]); */

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.name]: e.target.value });
  };

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
              placeholder="you@example.com"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.email ? "border-red-500" : ""
              }`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
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
              placeholder="********"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.password ? "border-red-500" : ""
              }`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password should be at least 6 characters",
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
