"use client"
import UpdateStudentPage from '@/components/UpdateStudent';
import UpdateTeacherPage from '@/components/UpdateTeacher';
import React from 'react'
import { useSelector } from 'react-redux'

const ProfileUpdate = () => {
  const role = useSelector(state=> state.role);
  return (
    <>
    {role == "student" && <UpdateStudentPage />}
    {role == "teacher" && <UpdateTeacherPage />}
    </>
  )
}

export default ProfileUpdate