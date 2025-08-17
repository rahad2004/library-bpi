"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { fixdeValues, updateStudent } from "@/store/Action";

const UpdateStudentPage = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const fixedValues = useSelector((state) => state.fixedValues);

  useEffect(() => {
    dispatch(
      fixdeValues({
        sessions: true,
        shifts: true,
        districts: true,
        upazilas: true,
        departments: true,
      })
    );
  }, [dispatch]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: profile?.name || "",
      phone: profile?.phone || "",
      banglaName: profile?.banglaName || "",
      fathersName: profile?.fathersName || "",
      mothersName: profile?.mothersName || "",
      addmissionRoll: profile?.addmissionRoll || "",
      boardRoll: profile?.boardRoll || "",
      registration: profile?.registration || "",
      session: profile?.session?._id || "",
      shift: profile?.shift?._id || "",
      district: profile?.district?._id || "",
      upazila: profile?.upazila?._id || "",
      union: profile?.union || "",
      village: profile?.village || "",
      department: profile?.department?._id || "",
      address: profile?.address || "",
      image: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      phone: Yup.string().required("Phone is required"),
      department: Yup.string().required("Department is required"),
      address: Yup.string().required("Address is required"),
      banglaName: Yup.string().required("Bangla Name is required"),
      fathersName: Yup.string().required("Father's Name is required"),
      mothersName: Yup.string().required("Mother's Name is required"),

      admissionRoll: Yup.string(),
      boardRoll: Yup.string(),
      registration: Yup.string(),

      session: Yup.string().required("Session is required"),
      shift: Yup.string().required("Shift is required"),
      district: Yup.string().required("District is required"),
      upazila: Yup.string().required("Upazila is required"),
      union: Yup.string().required("Union is required"),
      village: Yup.string().required("Village is required"),
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
      dispatch(updateStudent(formData));
    },
  });

  return (
    <div className=" flex justify-center items-start  py-8 px-4">
      <form
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
        className="bg-bgl1 dark:bg-bgd2 border dark:border-bord w-full max-w-5xl p-8 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6"
        noValidate
      >
        <h2 className="text-3xl font-bold text-center mb-8 col-span-2 text-gray-800">
          Update Profile
        </h2>

        {/* Text Inputs */}
        {[
          { label: "Name", name: "name", type: "text" },
          { label: "Phone", name: "phone", type: "text" },
          { label: "Bangla Name", name: "banglaName", type: "text" },
          { label: "Father's Name", name: "fathersName", type: "text" },
          { label: "Mother's Name", name: "mothersName", type: "text" },
          { label: "Admission Roll", name: "addmissionRoll", type: "text" },
          { label: "Board Roll", name: "boardRoll", type: "text" },
          { label: "Registration", name: "registration", type: "text" },
          { label: "Union", name: "union", type: "text" },
          { label: "Village", name: "village", type: "text" },
        ].map(({ label, name, type }) => (
          <div key={name} className="flex flex-col col-span-2 md:col-span-1">
            <label
              htmlFor={name}
              className="text-sm font-semibold text-textl dark:text-textd mb-1 relative top-[15px] left-[5px] bg-bgl1 dark:bg-bgd1 z-10 w-fit px-2 cursor-pointer"
            >
              {label}
            </label>
            <input
              id={name}
              type={type}
              name={name}
              required
              value={formik.values[name]}
              onChange={(e) => !profile[name] && formik.handleChange(e)}
              onBlur={formik.handleBlur}
              aria-describedby={`${name}-error`}
              disabled={profile[name]}
              className={`border rounded-md p-3 transition bg-bgl1 dark:bg-bgd1 text-textl dark:text-textd
                ${
                  formik.touched[name] && formik.errors[name]
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }
              `}
            />
            {formik.touched[name] && formik.errors[name] && (
              <p
                id={`${name}-error`}
                className="text-red-600 text-xs mt-1"
                role="alert"
              >
                {formik.errors[name]}
              </p>
            )}
          </div>
        ))}

        {/* Select Inputs */}
        {[
          {
            name: "session",
            label: "Session",
            options: fixedValues?.sessions || [],
          },
          {
            name: "shift",
            label: "Shift",
            options: fixedValues?.shifts || [],
          },
          {
            name: "department",
            label: "Department",
            options: fixedValues?.departments || [],
          },
        ].map(({ name, label, options }) => (
          <div key={name} className="flex flex-col col-span-2 md:col-span-1">
            <label
              htmlFor={name}
              className="text-textl dark:text-textd text-sm font-semibold mb-1 relative top-[15px] left-[5px] bg-bgl1 dark:bg-bgd1 z-10 w-fit px-2 cursor-pointer"
            >
              {label}
            </label>
            <select
              id={name}
              name={name}
              required
              value={formik.values[name]}
              onChange={(e) => !profile[name] && formik.handleChange(e)}
              onBlur={formik.handleBlur}
              aria-describedby={`${name}-error`}
              disabled={profile[name]}
              className={`border rounded-md px-3 py-2 transition bg-bgl1 dark:bg-bgd1 text-textl dark:text-textd
                ${
                  formik.touched[name] && formik.errors[name]
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }
              `}
            >
              <option value="">-- Select {label} --</option>
              {options.map((option) => (
                <option key={option._id} value={option._id}>
                  {option.name}
                </option>
              ))}
            </select>
            {formik.touched[name] && formik.errors[name] && (
              <p
                id={`${name}-error`}
                className="text-red-600 text-xs mt-1"
                role="alert"
              >
                {formik.errors[name]}
              </p>
            )}
          </div>
        ))}

        {/* Datalist Inputs */}
        {[
          ["district", "District", fixedValues?.districts],
          ["upazila", "Upazila", fixedValues?.upazilas],
        ].map(([name, label, options]) => (
          <div key={name} className="flex flex-col col-span-2 md:col-span-1">
            <label
              htmlFor={name}
              className="text-sm font-semibold text-textl dark:text-textd mb-1 relative top-[15px] left-[5px] bg-bgl1 dark:bg-bgd1 z-10 w-fit px-2 cursor-pointer"
            >
              {label}
            </label>
            <select
              id={name}
              name={name}
              required
              value={formik.values[name]}
              onChange={(e) => !profile[name] && formik.handleChange(e)}
              onBlur={formik.handleBlur}
              aria-describedby={`${name}-error`}
              disabled={profile[name]}
              className={`border rounded-md px-3 py-2 transition bg-bgl1 dark:bg-bgd1 text-textl dark:text-textd
        ${
          formik.touched[name] && formik.errors[name]
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-blue-500"
        }
      `}
            >
              <option value="" disabled>
                Select {label}
              </option>
              {options?.map((option) => (
                <option key={option._id} value={option._id}>
                  {option.name}
                </option>
              ))}
            </select>
            {formik.touched[name] && formik.errors[name] && (
              <p
                id={`${name}-error`}
                className="text-red-600 text-xs mt-1"
                role="alert"
              >
                {formik.errors[name]}
              </p>
            )}
          </div>
        ))}

        {/* Address Textarea */}
        <div className="flex flex-col col-span-2">
          <label
            htmlFor="address"
            className="text-sm font-semibold text-textl dark:text-textd mb-1 relative top-[15px] left-[5px] bg-bgl1 dark:bg-bgd1 z-10 w-fit px-2 cursor-pointer"
          >
            Address
          </label>
          <textarea
            id="address"
            name="address"
            rows="4"
            required
            value={formik.values.address}
            onChange={(e) => !profile["address"] && formik.handleChange(e)}
            onBlur={formik.handleBlur}
            aria-describedby="address-error"
            disabled={profile.address}
            className={`border rounded-md p-3 resize-none transition bg-bgl1 dark:bg-bgd1 text-textl dark:text-textd
              ${
                formik.touched.address && formik.errors.address
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }
            `}
          />
          {formik.touched.address && formik.errors.address && (
            <p
              id="address-error"
              className="text-red-600 text-xs mt-1"
              role="alert"
            >
              {formik.errors.address}
            </p>
          )}
        </div>

        {/* Image Preview */}
        <div className="col-span-2 mb-4 flex flex-wrap gap-4">
          {formik.values.image ? (
            <img
              src={URL.createObjectURL(formik.values.image)}
              alt="Selected preview"
              className="w-24 h-24 object-cover rounded-md border border-gray-300"
              onLoad={(e) => URL.revokeObjectURL(e.target.src)}
              loading="lazy"
            />
          ) : profile?.avatar?.url ? (
            <img
              src={profile.avatar.url}
              alt="Current Avatar"
              className="w-24 h-24 object-cover rounded-md border border-gray-300"
              loading="lazy"
            />
          ) : null}
        </div>

        {/* File Input */}
        <div className="col-span-2">
          <label
            htmlFor="image"
            className="block mb-2 text-sm font-semibold text-gray-700 cursor-pointer"
          >
            Upload Image
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            disabled={profile.avatar.url}
            onChange={(event) => {
              if (!profile.avatar.url) {
                formik.setFieldValue("image", event.currentTarget.files[0]);
              }
            }}
            className="w-full cursor-pointer rounded border border-gray-300 p-2  bg-bgl1 dark:bg-bgd1 text-textl dark:text-textd"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="col-span-2 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition font-semibold text-lg"
          disabled={formik.isSubmitting || true}
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateStudentPage;
