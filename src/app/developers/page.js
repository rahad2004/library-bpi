import DeveloperPage from "@/components/Developers";
import React from "react";

export async function generateMetadata() {
  return {
    title: "LMS | Developers",
    description:
      "Meet the developers of the Bogura Polytechnic Institute Library Management System.",
  };
}

const page = () => {
  return <DeveloperPage />;
};

export default page;
