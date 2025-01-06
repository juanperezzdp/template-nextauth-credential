"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

interface ResetFormInputs {
  email: string;
}

interface ApiResponse {
  message: string;
}

const RequestReset = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetFormInputs>();
  const [message, setMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<ResetFormInputs> = async (data) => {
    const res = await axios.post<ApiResponse>("/api/auth/reset-request", {
      email: data.email,
    });
    setMessage(res.data.message);
  };

  return (
    <section className="w-full h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="shadow-lg shadow-zinc-500 w-full gap-4 flex flex-col bg-white rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-8 dark:bg-gray-800 dark:border-gray-700"
      >
        <div>
          {message && (
            <div
              className={`font-bold text-center ${
                message === "Email sent, check your inbox"
                  ? " text-green-800"
                  : " text-red-800"
              }`}
            >
              {message}
            </div>
          )}
        </div>
        <h1 className="text-4xl font-bold text-center ">
          Send email to reset password
        </h1>

        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="Enter your email"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Send Reset Link
        </button>
      </form>
    </section>
  );
};

export default RequestReset;
