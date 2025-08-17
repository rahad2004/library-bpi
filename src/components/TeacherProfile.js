"use client";
import { logout } from "@/store/Action";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const TeacherCard = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.role);
  const teacher = useSelector((state) => state.profile);

  return (
    <div className="relative w-full max-w-3xl mx-auto bg-bgl1 dark:bg-bgd2 border dark:border-bord shadow-md dark:shadow-shadd rounded-2xl p-6 space-y-4">
      <button
        onClick={() => dispatch(logout(role))}
        className="absolute top-[20px] right-[20px] bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded"
      >
        Logout
      </button>
      {/* Top Section */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        {/* Avatar */}
        <img
          src={teacher?.avatar?.url}
          alt="Avatar"
          className="w-24 h-24 rounded-full border object-cover mx-auto md:mx-0"
        />

        {/* Info */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-textl dark:text-textd">{teacher?.name}</h2>
          <p className="text-sm text-gray-500">{teacher?.post?.name}</p>
          <p className="text-sm text-gray-500">{teacher?.department?.name}</p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Info label="Email" value={teacher?.email} />
        <Info label="Phone" value={teacher?.phone} />
        <Info label="NID" value={teacher?.nId || "N/A"} />
        <Info label="Teacher ID" value={teacher?.teacherId || "N/A"} />
        <Info label="Address" value={teacher?.address || "N/A"} />
      </div>

      {/* Status Tags */}
      <div className="flex gap-4 flex-wrap">
        <StatusBadge label="Approved" active={teacher?.isApproved} />
        <StatusBadge label="Banned" active={teacher?.isBan} inverse />
      </div>

      <div className="flex gap-3">
        <Link
          href={`/profile/update`}
          className="bg-yellow-400 hover:bg-yellow-500 hover:shadow-xl text-black px-3 py-1 rounded text-xs"
        >
          Edit
        </Link>
        <Link
          href={`/profile/change-password`}
          className="bg-yellow-400 hover:bg-yellow-500 hover:shadow-xl text-black px-3 py-1 rounded text-xs"
        >
          Change Password
        </Link>
      </div>
    </div>
  );
};

// Helper Components
const Info = ({ label, value }) => (
  <div>
    <p className="text-textl dark:text-textd opacity-70 text-sm font-medium">{label}</p>
    <p className="text-textl dark:text-textd font-semibold">{value}</p>
  </div>
);

const StatusBadge = ({ label, active, inverse = false }) => {
  const color = inverse
    ? active
      ? "bg-red-100 text-red-600"
      : "bg-gray-100 text-gray-400"
    : active
    ? "bg-green-100 text-green-600"
    : "bg-gray-100 text-gray-400";

  return (
    <span className={`text-xs px-3 py-1 rounded-full font-medium ${color}`}>
      {label}: {active ? "Yes" : "No"}
    </span>
  );
};

export default TeacherCard;
