"use client";

import { login } from "@/store/Action";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSearchParams } from "next/navigation";

export default function Login() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/books";

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      role: "student",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      role: Yup.string()
        .oneOf(["student", "teacher"])
        .required("Role is required"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      dispatch(
        login(
          { email: values.email, password: values.password },
          values.role,
          next
        )
      ).finally(() => setSubmitting(false));
    },
  });

  return (
    <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-bgl1 dark:bg-bgd1">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-md rounded-2xl shadow-xl p-8 sm:p-10 border border-borl dark:border-bord bg-bgl2 dark:bg-bgd2"
      >
        <h2 className="text-3xl font-extrabold text-textl dark:text-textd text-center mb-6">
          Sign in to your account
        </h2>

        {/* Role selection */}
        <div className="mb-6">
          <label className="text-sm font-medium text-textl dark:text-textd mb-2 block">
            Login as
          </label>
          <div className="flex gap-6">
            {["student", "teacher"].map((r) => (
              <label key={r} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value={r}
                  checked={formik.values.role === r}
                  onChange={formik.handleChange}
                  className={
                    r === "student" ? "accent-buttonp" : "accent-buttona"
                  }
                />
                <span className="capitalize text-textl dark:text-textd">
                  {r}
                </span>
              </label>
            ))}
          </div>
          {formik.touched.role && formik.errors.role && (
            <p className="text-buttonw text-sm mt-1">{formik.errors.role}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-textl dark:text-textd mb-1"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-4 py-2 border rounded-md shadow-sm transition focus:ring-2 focus:ring-buttona focus:outline-none bg-bgl1 dark:bg-bgd1 text-textl dark:text-textd ${
              formik.touched.email && formik.errors.email
                ? "border-buttonw"
                : "border-borl dark:border-bord"
            }`}
            placeholder="your@email.com"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-buttonw text-sm mt-1">{formik.errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-6">
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
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-4 py-2 border rounded-md shadow-sm transition focus:ring-2 focus:ring-buttona focus:outline-none bg-bgl1 dark:bg-bgd1 text-textl dark:text-textd ${
              formik.touched.password && formik.errors.password
                ? "border-buttonw"
                : "border-borl dark:border-bord"
            }`}
            placeholder="Enter your password"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-buttonw text-sm mt-1">
              {formik.errors.password}
            </p>
          )}
        </div>
        <div className="mb-2 mt-[-15px] ml-auto">
          <Link
            href="/auth/forgot-password"
            className="text-buttona hover:underline font-medium"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full bg-buttona text-white py-2 rounded-md font-semibold hover:bg-[color:var(--buttona)] focus:ring-2 focus:ring-buttona focus:outline-none transition disabled:opacity-50"
        >
          {formik.isSubmitting ? "Logging in..." : "Login"}
        </button>

        {/* Redirect */}
        <p className="text-sm text-center text-textl dark:text-textd mt-4">
          Don't have an account?{" "}
          <Link
            href="/auth/register"
            className="text-buttona hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
