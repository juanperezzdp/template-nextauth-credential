"use client";
import React, { use } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";

interface NewPasswordFormInputs {
  password: string;
}

const NewPassword = ({ params }: { params: Promise<{ token: string }> }) => {
  const { token } = use(params);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewPasswordFormInputs>();
  const [message, setMessage] = React.useState<string | null>(null);

  const onSubmit: SubmitHandler<NewPasswordFormInputs> = async (data) => {
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password: data.password }),
    });

    const resData = await res.json();
    if (res.ok) {
      setMessage(resData.message);
    } else {
      setMessage(resData.message || "Error resetting password");
    }
  };

  return (
    <section className="w-full h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="shadow-lg shadow-zinc-500 w-full gap-4 flex flex-col bg-white rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-8 dark:bg-gray-800 dark:border-gray-700"
      >
        <div className="h-4">
          {message && (
            <div
              className={`font-bold text-center ${
                message === "Password updated successfully"
                  ? " text-green-800"
                  : " text-red-800"
              }`}
            >
              {message}
            </div>
          )}
        </div>

        <h1 className="text-4xl font-bold mb-4 text-center">Reset Password</h1>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            {...register("password", {
              required: "Password is required",
              validate: (value) => {
                const minLength = 8;
                const hasUpperCase = /[A-Z]/.test(value);
                const hasNumber = /\d/.test(value);
                if (value.length < minLength)
                  return "Password must be at least 8 characters long.";
                if (!hasUpperCase)
                  return "Password must contain at least one uppercase letter.";
                if (!hasNumber)
                  return "Password must contain at least one number.";
                return true;
              },
            })}
            type="password"
            placeholder="Password"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <div className="h-4">
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>
        {message === "Password updated successfully" ? (
          <Link
            href="/"
            className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Back to login
          </Link>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full text-white ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            } focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
          >
            {isSubmitting ? "Submitting..." : "Restore"}
          </button>
        )}
      </form>
    </section>
  );
};

export default NewPassword;
