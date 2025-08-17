"use client";

import { authenticated } from "@/store/Action";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProfileRedirect = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.isLoading);
  const auth_loaded = useSelector((state) => state.auth_loaded);
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    dispatch(authenticated());
  }, []);

  useEffect(() => {
    if (auth_loaded && !isLoading && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, auth_loaded, isLoading]);

  return <></>;
};

export default ProfileRedirect;
