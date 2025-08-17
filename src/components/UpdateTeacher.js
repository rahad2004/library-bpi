"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { fixdeValues, updateTeacher } from "@/store/Action";

const UpdateTeacherPage = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const fixedValues = useSelector((state) => state.fixedValues);

  useEffect(() => {
    dispatch(
      fixdeValues({
        departments: true,
        posts: true,
      })
    );
  }, [dispatch]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: profile?.name || "",
      phone: profile?.phone || "",
      nId: profile?.nId || "",
      teacherId: profile?.teacherId || "",
      department: profile?.department?._id || "",
      post: profile?.post?._id || "",
      address: profile?.address || "",
      image: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      phone: Yup.string().required("Phone is required"),
      nId: Yup.string().required("NID is required"),
      teacherId: Yup.string().required("Teacher ID is required"),
      department: Yup.string().required("Department is required"),
      post: Yup.string().required("Post is required"),
      address: Yup.string().required("Address is required"),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      for (const key in values) {
        if (key === "image" && values.image) {
          formData.append("image", values.image);
        } else {
          formData.append(key, values[key]);
        }
      }
      dispatch(updateTeacher(formData));
    },
  });

  return (
    <div className=" flex justify-center items-start  py-8 px-4">
      <form
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
        noValidate
        className=" border dark:border-bord bg-bgl1 dark:bg-bgd2 w-full max-w-4xl p-8 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <h2 className="text-3xl font-bold text-textl dark:text-textd text-center mb-6 col-span-2">
          Update Profile
        </h2>

        {/* Inputs: Name, Phone, NID, Teacher ID */}
        {[
          { label: "Name", name: "name", type: "text" },
          { label: "Phone", name: "phone", type: "text" },
          { label: "NID", name: "nId", type: "text" },
          { label: "Teacher ID", name: "teacherId", type: "text" },
        ].map(({ label, name, type }) => {
          const errorId = `${name}-error`;
          return (
            <div key={name} className="flex flex-col col-span-2 md:col-span-1">
              <label
                htmlFor={name}
                className="text-sm font-medium bg-bgl1 dark:bg-bgd1 text-textl dark:text-textd mb-1 relative top-[15px] left-[5px] bg-white z-10 w-fit px-2"
              >
                {label}
              </label>
              <input
                id={name}
                name={name}
                type={type}
                value={formik.values[name]}
                onChange={(e) => !profile[name] && formik.handleChange(e)}
                onBlur={formik.handleBlur}
                disabled={profile[name]}
                aria-describedby={
                  formik.touched[name] && formik.errors[name]
                    ? errorId
                    : undefined
                }
                aria-invalid={
                  formik.touched[name] && formik.errors[name] ? "true" : "false"
                }
                className={`border rounded-md p-3 bg-bgl1 dark:bg-bgd1 text-textl dark:text-textd border dark:border-bord ${
                  formik.touched[name] && formik.errors[name]
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {formik.touched[name] && formik.errors[name] && (
                <p
                  id={errorId}
                  className="text-red-500 text-sm mt-1"
                  role="alert"
                >
                  {formik.errors[name]}
                </p>
              )}
            </div>
          );
        })}

        {/* Post */}
        <div className="flex flex-col col-span-2 md:col-span-1">
          <label
            htmlFor="post"
            className="text-sm font-medium bg-bgl1 dark:bg-bgd1 text-textl dark:text-textd mb-1 relative top-[15px] left-[5px] bg-white z-10 w-fit px-2"
          >
            Posts
          </label>
          <select
            id="post"
            name="post"
            value={formik.values.post}
            onChange={(e) => !profile["post"] && formik.handleChange(e)}
            onBlur={formik.handleBlur}
            disabled={profile["post"]}
            aria-describedby={
              formik.touched.post && formik.errors.post
                ? "post-error"
                : undefined
            }
            aria-invalid={
              formik.touched.post && formik.errors.post ? "true" : "false"
            }
            className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-bgl1 dark:bg-bgd1 text-textl dark:text-textd border dark:border-bord ${
              formik.touched.post && formik.errors.post
                ? "border-red-500"
                : "border-gray-300"
            }`}
          >
            <option value="">-- Select Posts --</option>
            {fixedValues?.posts?.map((option) => (
              <option key={option._id} value={option._id}>
                {option.name}
              </option>
            ))}
          </select>
          {formik.touched.post && formik.errors.post && (
            <p
              id="post-error"
              className="text-red-500 text-sm mt-1"
              role="alert"
            >
              {formik.errors.post}
            </p>
          )}
        </div>

        {/* Department */}
        <div className="flex flex-col col-span-2 md:col-span-1">
          <label
            htmlFor="department"
            className="text-sm font-medium bg-bgl1 dark:bg-bgd1 text-textl dark:text-textd mb-1 relative top-[15px] left-[5px] bg-white z-10 w-fit px-2"
          >
            Department
          </label>
          <select
            id="department"
            name="department"
            value={formik.values.department}
            onChange={(e) => !profile["department"] && formik.handleChange(e)}
            onBlur={formik.handleBlur}
            disabled={profile["department"]}
            aria-describedby={
              formik.touched.department && formik.errors.department
                ? "department-error"
                : undefined
            }
            aria-invalid={
              formik.touched.department && formik.errors.department
                ? "true"
                : "false"
            }
            className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-bgl1 dark:bg-bgd1 text-textl dark:text-textd border dark:border-bord ${
              formik.touched.department && formik.errors.department
                ? "border-red-500"
                : "border-gray-300"
            }`}
          >
            <option value="">-- Select Department --</option>
            {fixedValues?.departments?.map((option) => (
              <option key={option._id} value={option._id}>
                {option.name}
              </option>
            ))}
          </select>
          {formik.touched.department && formik.errors.department && (
            <p
              id="department-error"
              className="text-red-500 text-sm mt-1"
              role="alert"
            >
              {formik.errors.department}
            </p>
          )}
        </div>

        {/* Address (full width) */}
        <div className="flex flex-col col-span-2">
          <label
            htmlFor="address"
            className="text-sm font-medium bg-bgl1 dark:bg-bgd1 text-textl dark:text-textd mb-1 relative top-[15px] left-[5px] bg-white z-10 w-fit px-2"
          >
            Address
          </label>
          <textarea
            id="address"
            name="address"
            rows={3}
            value={formik.values.address}
            onChange={(e) => !profile["address"] && formik.handleChange(e)}
            onBlur={formik.handleBlur}
            disabled={profile["address"]}
            aria-describedby={
              formik.touched.address && formik.errors.address
                ? "address-error"
                : undefined
            }
            aria-invalid={
              formik.touched.address && formik.errors.address ? "true" : "false"
            }
            className={`border rounded-md p-3  bg-bgl1 dark:bg-bgd1 text-textl dark:text-textd border dark:border-bord resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              formik.touched.address && formik.errors.address
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {formik.touched.address && formik.errors.address && (
            <p
              id="address-error"
              className="text-red-500 text-sm mt-1"
              role="alert"
            >
              {formik.errors.address}
            </p>
          )}
        </div>

        {/* Image Preview (full width) */}
        <div className="col-span-2 mb-4 flex flex-wrap gap-4">
          {formik.values.image ? (
            <img
              src={URL.createObjectURL(formik.values.image)}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-md border border-gray-300"
              onLoad={(e) => URL.revokeObjectURL(e.currentTarget.src)}
            />
          ) : (
            <img
              src={profile?.avatar?.url}
              alt="Teacher Avatar"
              className="w-24 h-24 object-cover rounded-md border border-gray-300"
            />
          )}
        </div>

        {/* Image Upload (full width) */}
        <div className="flex flex-col col-span-2">
          <label
            htmlFor="image"
            className="text-sm font-medium bg-bgl1 dark:bg-bgd1 text-textl dark:text-textd mb-1 relative top-[15px] left-[5px] bg-white z-10 w-fit px-2"
          >
            Image (Upload new image)
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={(event) => {
              if (!profile.avatar.url) {
                formik.setFieldValue("image", event.currentTarget.files[0]);
              }
            }}
            disabled={profile.avatar.url}
            className="border border-gray-300 rounded-md p-2 cursor-pointer"
            aria-describedby="image-help"
          />
          <p id="image-help" className="text-xs text-gray-500 mt-1">
            Upload a new image to update your profile picture.
          </p>
        </div>

        {/* Submit Button (full width) */}
        <button
          type="submit"
          disabled={formik.isSubmitting || true}
          className="col-span-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-3 rounded-md font-semibold transition"
        >
          {formik.isSubmitting ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default UpdateTeacherPage;
