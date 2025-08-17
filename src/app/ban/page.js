"use client";
import React, { useEffect } from "react";
import { Ban as BanIcon } from "lucide-react"; // Optional icon
import { authenticated } from "@/store/Action";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Ban = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.isLoading);
  const auth_loaded = useSelector((state) => state.auth_loaded);
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const profile = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(authenticated());
  }, []);

  useEffect(() => {
    if (auth_loaded && !isLoading) {
      if (!profile?.isBan || !isAuthenticated) {
        router.push("/");
      }
    }
  }, [profile, isAuthenticated, auth_loaded, isLoading]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md text-center border border-red-200">
        <BanIcon size={60} className="text-red-600 mx-auto" />
        <h1 className="text-3xl font-bold text-red-600 mt-4">You Are Banned</h1>
        <p className="text-gray-700 mt-2">
          Your account has been permanently suspended due to violation of our
          terms of service.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          If you believe this is a mistake, please contact to librarian.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-block bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Ban;
