import MyBooks from "@/components/MyBooks";
import React from "react";

export async function generateMetadata() {
  return {
    title: "LMS | My Borrowed Books",
    description:
      "All books borrowed by the user from Bogura Polytechnic Institute library are listed here.",
  };
}

const page = () => {
  return <MyBooks />;
};

export default page;
