"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

interface CustomUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  fullname?: string;
  createdAt?: string;
}

const Dashboard: React.FC = () => {
  const { data: session } = useSession();

  if (!session || !session.user) {
    return (
      <section className="w-full h-screen gap-4 flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900">
        <h2 className="font-bold text-3xl">It`s on dashboard</h2>
        <div className="shadow-lg shadow-zinc-500 overflow-hidden w-full h-60 gap-4 flex flex-col justify-center items-center bg-white rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-8 dark:bg-gray-800 dark:border-gray-700">
          <p className="text-red-500">User is not authenticated.</p>
        </div>
      </section>
    );
  }

  const data = session as { user: CustomUser; expires: string };

  return (
    <section className="w-full h-screen gap-4 flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900">
      <h2 className="font-bold text-3xl">It`s on dashboard</h2>
      <div className="shadow-lg shadow-zinc-500 overflow-hidden w-full gap-4 flex flex-col bg-white rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h1 className="font-bold text-3xl mb-4">Profile</h1>
        <div className="p-4 bg-indigo-200 dark:bg-gray-700 rounded-lg">
          <p>
            <span className="font-semibold">Full Name:</span>{" "}
            {data.user.fullname || "Unknown"}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {data.user.email}
          </p>
          <p>
            <span className="font-semibold">Account Created:</span>{" "}
            {data.user.createdAt
              ? new Date(data.user.createdAt).toLocaleString()
              : "Unknown"}
          </p>
          <p>
            <span className="font-semibold">Last Session:</span>{" "}
            {new Date(data.expires).toLocaleString()}
          </p>
        </div>
        <button
          className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
          onClick={() => {
            signOut();
          }}
        >
          Signout
        </button>
        <Link
          href="/reset-password"
          className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-500"
        >
          Change Password
        </Link>
      </div>
    </section>
  );
};

export default Dashboard;
