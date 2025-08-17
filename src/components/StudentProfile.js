"use client";
import { logout } from "@/store/Action";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const StudentCard = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.role);
  const student = useSelector((state) => state.profile);

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
          src={student?.avatar?.url}
          alt="Avatar"
          className="w-24 h-24 rounded-full border object-cover mx-auto md:mx-0"
        />

        {/* Info */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-textl dark:text-textd">
            {student?.name}
          </h2>
          <p className="text-sm text-gray-500">{student?.department?.name}</p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Info label="Email" value={student?.email} />
        <Info label="Phone" value={student?.phone} />
        <Info label="Bangla Name" value={student?.banglaName || "N/A"} />
        <Info label="Fathers name" value={student?.fathersName || "N/A"} />
        <Info label="Mothers Name" value={student?.mothersName || "N/A"} />
        <Info label="addmissionRoll" value={student?.addmissionRoll || "N/A"} />
        <Info label="boardRoll" value={student?.boardRoll || "N/A"} />
        <Info label="registration" value={student?.registration || "N/A"} />
        <Info label="department" value={student?.department?.name || "N/A"} />
        <Info label="session" value={student?.session?.name || "N/A"} />
        <Info label="shift" value={student?.shift?.name || "N/A"} />
        <Info label="district" value={student?.district?.name || "N/A"} />
        <Info label="upazila" value={student?.upazila?.name || "N/A"} />
        <Info label="union" value={student?.union || "N/A"} />
        <Info label="village" value={student?.village || "N/A"} />
        <Info label="address" value={student?.address || "N/A"} />
      </div>

      {/* Status Tags */}
      <div className="flex gap-4 flex-wrap">
        <StatusBadge label="Approved" active={student?.isApproved} />
        <StatusBadge label="Banned" active={student?.isBan} inverse />
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
    <p className="text-textl dark:text-textd opacity-70 text-sm font-medium">
      {label}
    </p>
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

export default StudentCard;
