"use client";

import { resetPassword } from "@/store/Action";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function ForgotPasswordForm() {
  const { token } = useParams();
  const [role, setRole] = useState("student");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
    dispatch(resetPassword(newPassword, confirmPassword, token, role));
    setTimeout(() => setLoading(false), 5000); // Disable for 5s
  };

  return (
    <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-bgl1 dark:bg-bgd1">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-bgl2 dark:bg-bgd2 p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-md mx-auto border border-borl dark:border-bord"
      >
        <h2 className="text-2xl font-bold text-center text-textl dark:text-textd">
          Reset Password
        </h2>

        {/* Role selection */}
        <div>
          <label className="block text-sm font-medium text-textl dark:text-textd mb-2">
            Select Role
          </label>
          <div className="flex gap-4">
            {["student", "teacher"].map((r) => (
              <label
                key={r}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md border transition cursor-pointer ${
                  role === r
                    ? r === "student"
                      ? "bg-buttonp/10 border-buttonp text-buttonp"
                      : "bg-buttona/10 border-buttona text-buttona"
                    : "border-borl dark:border-bord text-textl dark:text-textd hover:bg-bgl1 dark:hover:bg-bgd1"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value={r}
                  checked={role === r}
                  onChange={() => setRole(r)}
                  className="hidden"
                />
                <span className="capitalize font-medium">{r}</span>
              </label>
            ))}
          </div>
        </div>

        {/* New Password */}
        <div>
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-textl dark:text-textd mb-1"
          >
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            className="w-full px-4 py-2 border rounded-md border-borl dark:border-bord focus:outline-none focus:ring-2 focus:ring-buttona transition bg-bgl1 dark:bg-bgd1 text-textl dark:text-textd"
          />
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
            type="password"
            id="confirmPassword"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            className="w-full px-4 py-2 border rounded-md border-borl dark:border-bord focus:outline-none focus:ring-2 focus:ring-buttona transition bg-bgl1 dark:bg-bgd1 text-textl dark:text-textd"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-buttona text-white py-2 rounded-md font-semibold hover:bg-[color:var(--buttona)] transition disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-buttona focus:ring-offset-2"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>

        {/* Login link */}
        <p className="text-sm text-center text-textl dark:text-textd">
          Remembered password?{" "}
          <Link
            href="/auth/login"
            className="text-buttona hover:underline font-medium"
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
