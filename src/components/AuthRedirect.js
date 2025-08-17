"use client";

import { authenticated } from "@/store/Action";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AuthRedirect = () => {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(authenticated());
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/books");
    }
  }, [isAuthenticated]);

  return <></>;
};

export default AuthRedirect;
