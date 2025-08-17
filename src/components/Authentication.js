"use client";

import { authenticated } from "@/store/Action";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ThemeToggle from "./ThemeToggle";

const Authentication = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const profile = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(authenticated());
  }, []);

  return (
    <nav className="sticky top-0 z-[30] lg:z-[50] px-4 py-3 shadow-md bg-bgl1 dark:bg-bgd1 shadow-shadl dark:shadow-shadd border-b dark:border-b-bord">
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="text-2xl font-bold text-textl dark:text-textd hover:text-buttonp transition-colors"
          >
            LMS
          </Link>
        </div>

        <ThemeToggle />

        {/* Hamburger menu button for mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-textl dark:text-textd focus:outline-none border-none"
        >
          {open ? (
            // Close Icon (X)
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            // Hamburger Icon (≡)
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6">
          <Link href="/books" className="nav-link">
            Books
          </Link>
          {isAuthenticated && (
            <Link href="/books/my-books" className="nav-link">
              My Books
            </Link>
          )}
          {isAuthenticated ? (
            <Link href="/profile">
              <img
                src={profile?.avatar?.url || "/default-avatar.png"}
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover hover:shadow-[0_0_10px_rgba(0,0,200,0.9)] transition-all"
              />
            </Link>
          ) : (
            <>
              <Link href="/auth/login" className="nav-link">
                Login
              </Link>
              <Link href="/auth/register" className="nav-link">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu (toggle visibility) */}
        {open && (
          <div className="animate-slideDown py-3 absolute top-[46px] border dark:border-bord shadow-md dark:shadow-shadd left-0 bg-bgl1 dark:bg-bgd2 w-full lg:hidden flex flex-col items-center gap-3 mt-3 transition-all duration-300 ease-out z-40">
            <Link href="/books" className="nav-link">
              Books
            </Link>
            {isAuthenticated && (
              <Link href="/books/my-books" className="nav-link">
                My Books
              </Link>
            )}
            {isAuthenticated ? (
              <Link href="/profile" className="flex items-center gap-2">
                <img
                  src={profile?.avatar?.url || "/default-avatar.png"}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-textl dark:text-textd">Profile</span>
              </Link>
            ) : (
              <>
                <Link href="/auth/login" className="nav-link">
                  Login
                </Link>
                <Link href="/auth/register" className="nav-link">
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Authentication;
