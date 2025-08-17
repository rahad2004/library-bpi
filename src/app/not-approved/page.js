"use client";
import React, { useEffect } from "react";
import { XCircle } from "lucide-react"; // Optional: icon library
import { useDispatch, useSelector } from "react-redux";
import { authenticated } from "@/store/Action";
import { useRouter } from "next/navigation";
import Link from "next/link";

const page = () => {
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
      if (profile?.isApproved || !isAuthenticated) {
        router.push("/");
      }
    }
  }, [profile, isAuthenticated, auth_loaded, isLoading]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md text-center">
        <XCircle className="mx-auto text-red-500" size={60} />
        <h1 className="text-2xl font-semibold text-gray-800 mt-4">
          Access Denied
        </h1>
        <p className="text-gray-600 mt-2">
          Your account has not been approved yet.
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Please contact to librarian for approval. If this is an error, contact
          support.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
