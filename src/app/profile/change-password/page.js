"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateProfilePassword } from "@/store/Action"; // Adjust import as needed

const ChangePasswordPage = () => {
  const role = useSelector((state) => state.role);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required("Old password is required"),
      newPassword: Yup.string()
        .required("New password is required")
        .min(6, "Minimum 6 characters"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Please confirm your new password"),
    }),
    onSubmit: (values, { setSubmitting, resetForm }) => {
      dispatch(updateProfilePassword(values, role)).finally(() => {
        setSubmitting(false);
        // optionally reset form on success
        // resetForm();
      });
    },
  });

  return (
    <div className=" flex justify-center items-start py-12 px-4">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-bgl1 dark:bg-bgd2 w-full max-w-xl p-8 rounded-lg shadow-lg border dark:border-bord flex flex-col gap-6"
      >
        <h2 className="text-2xl text-textl dark:text-textd font-bold text-center">Change Password</h2>

        {[
          { name: "oldPassword", label: "Old Password" },
          { name: "newPassword", label: "New Password" },
          { name: "confirmPassword", label: "Confirm New Password" },
        ].map(({ name, label }) => (
          <div key={name} className="flex flex-col">
            <label
              htmlFor={name}
              className="text-sm font-medium text-textl dark:text-textd mb-1 relative top-[15px] left-[5px] bg-bgl1 dark:bg-bgd1 z-10 w-fit px-2"
            >
              {label}
            </label>
            <input
              type="password"
              id={name}
              name={name}
              value={formik.values[name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`border rounded-md p-3 bg-bgl1 dark:bg-bgd1 text-textl dark:text-textd ${
                formik.touched[name] && formik.errors[name]
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              autoComplete={
                name === "oldPassword" ? "current-password" : "new-password"
              }
            />
            {formik.touched[name] && formik.errors[name] && (
              <p className="text-red-500 text-sm mt-1">{formik.errors[name]}</p>
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition disabled:opacity-50"
        >
          {formik.isSubmitting ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
