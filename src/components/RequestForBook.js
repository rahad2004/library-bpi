"use client";
import { requestForBook } from "@/store/Action";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const RequestForBook = ({ id }) => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.role);
  const [isCooldown, setIsCooldown] = useState(false);

  const handleRequest = () => {
    if (isCooldown) return;

    dispatch(requestForBook(id, role));
    setIsCooldown(true);
    setTimeout(() => {
      setIsCooldown(false);
    }, 5000); // 5 seconds
  };
  return (
    <button
      onClick={handleRequest}
      disabled={isCooldown}
      className={`${
        isCooldown
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700"
      } px-6 py-3 bg-blue-600 border-none text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300`}
    >
      {isCooldown ? "Wait 5s..." : "বইটি সংগ্রহ করুন"}
    </button>
  );
};

export default RequestForBook;
