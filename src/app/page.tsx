"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

interface SigninFormInputs {
  email: string;
  password: string;
}

const Login = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormInputs>();

  const onSubmit: SubmitHandler<SigninFormInputs> = async (data) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.error) setError(res.error as string);
    if (res?.ok) router.push("/dashboard");
  };

  return (
    <section className="w-full h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="shadow-lg shadow-zinc-500 w-full gap-4 flex flex-col bg-white rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-8 dark:bg-gray-800 dark:border-gray-700"
      >
        <div className="h-auto flex justify-center">
          {error && <div className="text-red-500 font-bold ">{error}</div>}
        </div>

        <h1 className="text-4xl font-bold mb-4 text-center">Signin</h1>

        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            placeholder="name@gmail.com"
            className={`bg-gray-50 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } text-gray-900 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white`}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                message: "Invalid email address",
              },
            })}
          />

          <div className="h-4">
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            className={`bg-gray-50 border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } text-gray-900 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white`}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          <div className="h-4">
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between mt-2">
            <Link
              href="/reset-password"
              className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-500"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <button
          type="submit"
          className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
        >
          Signin
        </button>

        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Don’t have an account yet?{" "}
          <Link
            href="/register"
            className="font-medium text-indigo-600 hover:underline dark:text-indigo-500"
          >
            Sign up
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Login;
