"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SignupInputs {
  fullname: string;
  email: string;
  password: string;
}

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInputs>();
  const [apiError, setApiError] = useState<string | undefined>();
  const router = useRouter();

  const onSubmit: SubmitHandler<SignupInputs> = async (data) => {
    try {
      setApiError(undefined);

      const signupResponse = await axios.post("/api/auth/signup", data);

      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (res?.ok) {
        router.push("/dashboard");
      } else {
        throw new Error("Sign-in failed");
      }
    } catch (error) {
      console.error(error);

      if ((error as AxiosError).isAxiosError) {
        const axiosError = error as AxiosError;
        setApiError(axiosError.response?.data.message || "An error occurred.");
      } else {
        setApiError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <section className="w-full h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="shadow-lg shadow-zinc-500 w-full gap-4 flex flex-col bg-white rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-8 dark:bg-gray-800 dark:border-gray-700"
      >
        <div className="h-4 flex justify-center">
          {apiError && (
            <div className="text-red-500 font-bold p-2 mb-2">{apiError}</div>
          )}
        </div>

        <h1 className="text-4xl font-bold mb-4 text-center">Signup</h1>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Fullname:
          </label>
          <input
            {...register("fullname", { required: "Fullname is required" })}
            type="text"
            placeholder="Fullname"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <div className="h-6">
            {errors.fullname && (
              <p className="text-red-500 text-sm h-4">
                {errors.fullname.message}
              </p>
            )}
          </div>

          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Email:
          </label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
            type="email"
            placeholder="Email"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <div className="h-6">
            {errors.email && (
              <p className="text-red-500 text-sm h-4">{errors.email.message}</p>
            )}
          </div>

          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Password:
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
          <div className="h-6">
            {errors.password && (
              <p className="text-red-500 text-sm ">{errors.password.message}</p>
            )}
          </div>
        </div>

        <button className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
          Signup
        </button>
      </form>
    </section>
  );
};

export default Register;
