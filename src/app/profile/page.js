"use client";
import StudentCard from "@/components/StudentProfile";
import TeacherCard from "@/components/TeacherProfile";
import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const role = useSelector((state) => state.role);
  return (
    <div>
      {role == "teacher" && <TeacherCard />}
      {role == "student" && <StudentCard />}
    </div>
  );
};

export default Profile;
