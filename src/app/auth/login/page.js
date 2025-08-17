import Loading from "@/components/Loading";
import Login from "@/components/Login";
import React, { Suspense } from "react";

export async function generateMetadata() {
  return {
    title: "LMS | Login",
    description:
      "Login to the Bogura Polytechnic Institute Library Management System to access your account and manage your library activities.",
  };
}

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Login />
    </Suspense>
  );
};

export default page;
