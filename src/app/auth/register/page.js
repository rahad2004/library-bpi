"use client";

import { fixdeValues, otpSend, register } from "@/store/Action";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { MESSAGE } from "@/store/constant";

export default function Register() {
  const dispatch = useDispatch();
  const [role, setRole] = useState("student");
  const [initialValues, setInitialValues] = useState({});
  const [validations, setValidations] = useState({});
  const fixedValues = useSelector((state) => state.fixedValues);

  useEffect(() => {
    dispatch(
      fixdeValues({
        departments: true,
        sessions: true,
        shifts: true,
        districts: true,
        upazilas: true,
        posts: true,
      })
    );
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      otp: "",
      password: "",
      confirmPassword: "",
      ...initialValues,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      otp: Yup.string().required("Required"),
      password: Yup.string().min(6, "Min 6 characters").required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Required"),
      ...validations,
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
      formData.append("verificationCode", values.otp);
      dispatch(register(formData, role));
    },
  });

  const handleSendOtp = () => {
    if (formik.values.email && !formik.errors.email) {
      dispatch(otpSend(formik.values.email, role));
    }
  };

  useEffect(() => {
    if (role === "student") {
      setInitialValues({
        name: "",
        phone: "",
        banglaName: "",
        fathersName: "",
        mothersName: "",
        addmissionRoll: "",
        boardRoll: "",
        registration: "",
        session: "",
        shift: "",
        district: "",
        upazila: "",
        union: "",
        village: "",
        department: "",
        address: "",
        image: null,
      });
      setValidations({
        name: Yup.string()
          .min(3, "Name must be at least 3 characters")
          .max(100, "Name can't exceed 100 characters")
          .required("Name is required"),

        phone: Yup.string()
          .matches(/^01[3-9]\d{8}$/, "Invalid Bangladeshi phone number")
          .required("Phone is required"),

        banglaName: Yup.string().required("Bangla Name is required"),

        fathersName: Yup.string()
          .min(3, "Father's Name must be at least 3 characters")
          .required("Father's Name is required"),

        mothersName: Yup.string()
          .min(3, "Mother's Name must be at least 3 characters")
          .required("Mother's Name is required"),

        addmissionRoll: Yup.string()
          .matches(/^\d{4,10}$/, "Admission Roll should be a number")
          .notRequired(),

        boardRoll: Yup.string()
          .matches(/^\d{4,10}$/, "Board Roll should be a number")
          .notRequired(),

        registration: Yup.string()
          .matches(/^\d{6,12}$/, "Invalid Registration Number")
          .notRequired(),

        session: Yup.string().required("Session is required"),

        shift: Yup.string().required("Shift is required"),

        district: Yup.string().required("District is required"),

        upazila: Yup.string().required("Upazila is required"),

        union: Yup.string()
          .min(2, "Union must be at least 2 characters")
          .required("Union is required"),

        village: Yup.string()
          .min(2, "Village must be at least 2 characters")
          .required("Village is required"),

        department: Yup.string().required("Department is required"),

        address: Yup.string()
          .min(10, "Address must be at least 10 characters")
          .required("Address is required"),

        image: Yup.mixed()
          .nullable()
          .test(
            "fileSize",
            "File too large (max 5MB)",
            (value) => !value || (value && value.size <= 5 * 1024 * 1024)
          )
          .test(
            "fileType",
            "Unsupported file format",
            (value) =>
              !value ||
              (value &&
                ["image/jpeg", "image/png", "image/jpg"].includes(value.type))
          ),
      });
    }
    if (role === "teacher") {
      setInitialValues({
        name: "",
        phone: "",
        nId: "",
        teacherId: "",
        department: "",
        post: "",
        address: "",
        image: null,
      });
      setValidations({
        name: Yup.string().required("Name is required"),
        phone: Yup.string().required("Phone is required"),
        nId: Yup.string().required("NID is required"),
        teacherId: Yup.string().required("Teacher ID is required"),
        department: Yup.string().required("Department is required"),
        post: Yup.string().required("Post is required"),
        address: Yup.string().required("Address is required"),
      });
    }
  }, [role]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8 bg-bgl1 dark:bg-bgd1">
      <div className="w-full max-w-6xl border border-borl rounded-lg shadow dark:border-bord">
        <div className="bg-bgl2 dark:bg-bgd2 rounded-lg shadow-xl overflow-hidden">
          <div className="md:flex">
            {/* Left side - Registration form */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-6">
                Create your account
              </h2>

              {/* Role Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-bgd1 dark:text-gray-300 mb-2">
                  Register As
                </label>
                <div className="flex gap-6">
                  {["student", "teacher"].map((r) => (
                    <label
                      key={r}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="role"
                        value={r}
                        checked={role === r}
                        onChange={() => setRole(r)}
                        className={
                          r === "student"
                            ? "accent-blue-600"
                            : "accent-purple-600"
                        }
                      />
                      <span className="text-bgd1 dark:text-gray-300 capitalize">
                        {r}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Form */}
              <form className="space-y-4">
                {/* Email + Send OTP */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-textl dark:text-textd mb-1"
                  >
                    Email
                  </label>
                  <div className="flex rounded-md shadow-sm">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md border border-borl dark:border-bord focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:text-sm bg-bgl2 dark:bg-bgd1 text-gray-900 dark:text-white"
                      placeholder="your@email.com"
                    />
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={!formik.values.email || !!formik.errors.email}
                      className={`inline-flex items-center px-4 py-2 border border-l-0 border-borl dark:border-bord rounded-r-md text-sm font-medium ${
                        !formik.values.email || !!formik.errors.email
                          ? "bg-gray-100 dark:bg-textl text-textd dark:text-gray-300 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                    >
                      Send OTP
                    </button>
                  </div>
                  {formik.touched.email && formik.errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {formik.errors.email}
                    </p>
                  )}
                </div>

                {/* OTP */}
                <div>
                  <label
                    htmlFor="otp"
                    className="block text-sm font-medium text-textl dark:text-textd mb-1"
                  >
                    OTP
                  </label>
                  <input
                    id="otp"
                    name="otp"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.otp}
                    className="block w-full px-3 py-2 border border-borl dark:border-bord rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:text-sm bg-bgl2 dark:bg-bgd1 text-gray-900 dark:text-white"
                    placeholder="Enter OTP"
                  />
                  {formik.touched.otp && formik.errors.otp && (
                    <p className="mt-1 text-sm text-red-600">
                      {formik.errors.otp}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-textl dark:text-textd mb-1"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className="block w-full px-3 py-2 border border-borl dark:border-bord rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:text-sm bg-bgl2 dark:bg-bgd1 text-gray-900 dark:text-white"
                    placeholder="Create a password"
                  />
                  {formik.touched.password && formik.errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {formik.errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-textl dark:text-textd mb-1"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    className="block w-full px-3 py-2 border border-borl dark:border-bord rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:text-sm bg-bgl2 dark:bg-bgd1 text-gray-900 dark:text-white"
                    placeholder="Confirm your password"
                  />
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">
                        {formik.errors.confirmPassword}
                      </p>
                    )}
                </div>
              </form>

              <p className="mt-4 text-center text-sm text-textl dark:text-textd">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="font-medium text-purple-600 hover:text-purple-500 dark:hover:text-purple-400"
                >
                  Login
                </Link>
              </p>
            </div>
            {/* Right side - Profile details */}
            <div className="w-full md:w-1/2 bg-bgl1 dark:bg-bgd1 p-6 sm:p-8 md:p-10 overflow-y-auto">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-6">
                Profile Details
              </h2>

              <form onSubmit={formik.handleSubmit} className="space-y-4">
                {role === "student" ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          label: "Name",
                          name: "name",
                          type: "text",
                          placeholder: "Md Abdus Sabur",
                        },
                        {
                          label: "Phone",
                          name: "phone",
                          type: "text",
                          placeholder: "01712345678",
                        },
                        {
                          label: "Bangla Name",
                          name: "banglaName",
                          type: "text",
                          placeholder: "মোঃ আব্দুস সবুর",
                        },
                        {
                          label: "Fathers Name",
                          name: "fathersName",
                          type: "text",
                          placeholder: "Enter Your Father's Name",
                        },
                        {
                          label: "Mothers Name",
                          name: "mothersName",
                          type: "text",
                          placeholder: "Enter Your Mother's Name",
                        },
                        {
                          label: "Addmission Roll",
                          name: "addmissionRoll",
                          type: "text",
                          placeholder: "818390",
                        },
                        {
                          label: "Board Roll",
                          name: "boardRoll",
                          type: "text",
                          placeholder: "616402",
                        },
                        {
                          label: "Registration",
                          name: "registration",
                          type: "text",
                          placeholder: "1502175556",
                        },
                        {
                          label: "Union",
                          name: "union",
                          type: "text",
                          placeholder: "Zianagar",
                        },
                        {
                          label: "Village",
                          name: "village",
                          type: "text",
                          placeholder: "Boria",
                        },
                      ].map((field) => (
                        <div key={field.name}>
                          <label className="block text-sm font-medium text-textl dark:text-textd mb-1">
                            {field.label}
                          </label>
                          <input
                            type={field.type}
                            name={field.name}
                            value={formik.values[field.name]}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder={field.placeholder}
                            className="block w-full px-3 py-2 border border-borl dark:border-bord rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:text-sm bg-bgl2 dark:bg-bgd1 text-gray-900 dark:text-white"
                          />
                          {formik.touched[field.name] &&
                            formik.errors[field.name] && (
                              <p className="mt-1 text-sm text-red-600">
                                {formik.errors[field.name]}
                              </p>
                            )}
                        </div>
                      ))}
                    </div>

                    {/* Dropdowns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-textl dark:text-textd mb-1">
                          Session
                        </label>
                        <select
                          name="session"
                          value={formik.values.session}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="block w-full px-3 py-2 border border-borl dark:border-bord rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:text-sm bg-bgl2 dark:bg-bgd1 text-gray-900 dark:text-white"
                        >
                          <option value="">-- Select Session --</option>
                          {fixedValues?.sessions?.map((option) => (
                            <option key={option._id} value={option._id}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-textl dark:text-textd mb-1">
                          Shift
                        </label>
                        <select
                          name="shift"
                          value={formik.values.shift}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="block w-full px-3 py-2 border border-borl dark:border-bord rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:text-sm bg-bgl2 dark:bg-bgd1 text-gray-900 dark:text-white"
                        >
                          <option value="">-- Select Shift --</option>
                          {fixedValues?.shifts?.map((option) => (
                            <option key={option._id} value={option._id}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-textl dark:text-textd mb-1">
                          Department
                        </label>
                        <select
                          name="department"
                          value={formik.values.department}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="block w-full px-3 py-2 border border-borl dark:border-bord rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:text-sm bg-bgl2 dark:bg-bgd1 text-gray-900 dark:text-white"
                        >
                          <option value="">-- Select Department --</option>
                          {fixedValues?.departments?.map((option) => (
                            <option key={option._id} value={option._id}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-textl dark:text-textd mb-1">
                          District
                        </label>
                        <select
                          name="district"
                          value={formik.values.district}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="block w-full px-3 py-2 border border-borl dark:border-bord rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:text-sm bg-bgl2 dark:bg-bgd1 text-gray-900 dark:text-white"
                        >
                          <option value="">-- Select District --</option>
                          {fixedValues?.districts?.map((option) => (
                            <option key={option._id} value={option._id}>
                              {option.name || option.className}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-textl dark:text-textd mb-1">
                          Upazila
                        </label>
                        <select
                          name="upazila"
                          value={formik.values.upazila}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="block w-full px-3 py-2 border border-borl dark:border-bord rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:text-sm bg-bgl2 dark:bg-bgd1 text-gray-900 dark:text-white"
                        >
                          <option value="">-- Select Upazila --</option>
                          {fixedValues?.upazilas
                            ?.filter(
                              (option) =>
                                option?.districtId?._id ===
                                formik.values.district
                            )
                            .map((option) => (
                              <option key={option._id} value={option._id}>
                                {option.name}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>

                    {/* Address */}
                    <div>
                      <label className="block text-sm font-medium text-textl dark:text-textd mb-1">
                        Address
                      </label>
                      <textarea
                        name="address"
                        rows="3"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="block w-full px-3 py-2 border border-borl dark:border-bord rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:text-sm bg-bgl2 dark:bg-bgd1 text-gray-900 dark:text-white"
                      />
                      {formik.touched.address && formik.errors.address && (
                        <p className="mt-1 text-sm text-red-600">
                          {formik.errors.address}
                        </p>
                      )}
                    </div>

                    {/* Image Upload */}
                    <div>
                      <label className="block text-sm font-medium text-textl dark:text-textd mb-1">
                        Profile Image
                      </label>
                      <div className="flex items-center space-x-4">
                        {formik.values.image && (
                          <img
                            src={URL.createObjectURL(formik.values.image)}
                            alt="Preview"
                            className="w-16 h-16 rounded-full object-cover border border-borl dark:border-bord"
                            onLoad={(e) => URL.revokeObjectURL(e.target.src)}
                          />
                        )}
                        <div className="flex-1">
                          <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={(event) => {
                              formik.setFieldValue(
                                "image",
                                event.currentTarget.files[0]
                              );
                            }}
                            className="block w-full text-sm text-textl dark:text-textd
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-md file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-bgl2 dark:file:bg-bgd2 file:text-buttonp dark:file:text-textd
                                        hover:file:bg-bgl1 dark:hover:file:bg-bgd1"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { label: "Name", name: "name", type: "text" },
                        { label: "Phone", name: "phone", type: "text" },
                        { label: "NID", name: "nId", type: "text" },
                        {
                          label: "Teacher ID",
                          name: "teacherId",
                          type: "text",
                        },
                      ].map((field) => (
                        <div key={field.name}>
                          <label className="block text-sm font-medium text-textl dark:text-textd mb-1">
                            {field.label}
                          </label>
                          <input
                            type={field.type}
                            name={field.name}
                            value={formik.values[field.name]}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="block w-full px-3 py-2 border border-borl dark:border-bord rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:text-sm bg-bgl2 dark:bg-bgd1 text-gray-900 dark:text-white"
                          />
                          {formik.touched[field.name] &&
                            formik.errors[field.name] && (
                              <p className="mt-1 text-sm text-red-600">
                                {formik.errors[field.name]}
                              </p>
                            )}
                        </div>
                      ))}

                      <div>
                        <label className="block text-sm font-medium text-textl dark:text-textd mb-1">
                          Post
                        </label>
                        <select
                          name="post"
                          value={formik.values.post}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="block w-full px-3 py-2 border border-borl dark:border-bord rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:text-sm bg-bgl2 dark:bg-bgd1 text-gray-900 dark:text-white"
                        >
                          <option value="">-- Select Post --</option>
                          {fixedValues?.posts?.map((option) => (
                            <option key={option._id} value={option._id}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-textl dark:text-textd mb-1">
                          Department
                        </label>
                        <select
                          name="department"
                          value={formik.values.department}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="block w-full px-3 py-2 border border-borl dark:border-bord rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:text-sm bg-bgl2 dark:bg-bgd1 text-gray-900 dark:text-white"
                        >
                          <option value="">-- Select Department --</option>
                          {fixedValues?.departments?.map((option) => (
                            <option key={option._id} value={option._id}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Address */}
                    <div>
                      <label className="block text-sm font-medium text-textl dark:text-textd mb-1">
                        Address
                      </label>
                      <textarea
                        name="address"
                        rows="3"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="block w-full px-3 py-2 border border-borl dark:border-bord rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:text-sm bg-bgl2 dark:bg-bgd1 text-gray-900 dark:text-white"
                      />
                      {formik.touched.address && formik.errors.address && (
                        <p className="mt-1 text-sm text-red-600">
                          {formik.errors.address}
                        </p>
                      )}
                    </div>

                    {/* Image Upload */}
                    <div>
                      <label className="block text-sm font-medium text-textl dark:text-textd mb-1">
                        Profile Image
                      </label>
                      <div className="flex items-center space-x-4">
                        {formik.values.image && (
                          <img
                            src={URL.createObjectURL(formik.values.image)}
                            alt="Preview"
                            className="w-16 h-16 rounded-full object-cover border border-borl dark:border-bord"
                            onLoad={(e) => URL.revokeObjectURL(e.target.src)}
                          />
                        )}
                        <div className="flex-1">
                          <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={(event) => {
                              formik.setFieldValue(
                                "image",
                                event.currentTarget.files[0]
                              );
                            }}
                            className="block w-full text-sm text-textl dark:text-textd
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-md file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-bgl2 dark:file:bg-bgd2 file:text-buttonp dark:file:text-textd
                                        hover:file:bg-bgl1 dark:hover:file:bg-bgd1"
                          />
                        </div>
                      </div>
                      {formik.touched.image && formik.errors.image && (
                        <p className="mt-1 text-sm text-red-600">
                          {formik.errors.image}
                        </p>
                      )}
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-buttona hover:bg-buttona focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-buttona"
                >
                  Create Account
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
