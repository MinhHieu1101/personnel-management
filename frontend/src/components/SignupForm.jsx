import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createUserRequest } from "../redux/actions/userActions";

const SignupForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const {
    loading,
    code,
    success,
    message,
    errors: validationErrors = [],
  } = useSelector((state) => state.user);

  const onSubmit = (data) => {
    console.log("Signup Data:", data);
    dispatch(
      createUserRequest(data.username, data.email, data.password, data.role)
    );
  };

  useEffect(() => {
    if (success) {
      toast.success(message, {
        position: "top-right",
        autoClose: 3000,
      });
      reset();
    }
  }, [success, message, reset]);

  useEffect(() => {
    if (validationErrors.length) {
      validationErrors.forEach((errMsg) =>
        toast.error(errMsg, { position: "top-right", autoClose: 5000 })
      );
    }
  }, [validationErrors]);

  useEffect(() => {
    if (!success && code === "500") {
      toast.error(message || "Server error. Please try again later.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  }, [success, code, message]);

  return (
    <div className="selection:bg-emerald-500 selection:text-white flex justify-center items-center p-8 landscape:md:pt-24 landscape:lg:pt-0">
      <div className="flex-1 mx-auto p-8">
        <h1 className="mb-10 landscape:md:mt-56 landscape:lg:mt-0 mt-12 sm:mt-24 md:mt-40 lg:mt-0 md:text-3xl lg:text-3xl xl:text-5xl 2xl:mx-10 ml-8 text-base font-bold text-emerald-600">
          Hello there!
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Username Field */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.username ? "border-red-500" : ""
              }`}
              {...register("username", {
                required: "Username is required",
              })}
            />
            {errors.username && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-4">
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

          {/* Password Field */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
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

          {/* Role Field */}
          <div className="mb-6">
            <label
              htmlFor="role"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Role
            </label>
            <select
              id="role"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.role ? "border-red-500" : ""
              }`}
              defaultValue=""
              {...register("role", {
                required: "Please select a role",
              })}
            >
              <option value="">Select Role</option>
              <option value="MEMBER">Member</option>
              <option value="MANAGER">Manager</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.role.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {loading ? "Creating…" : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
