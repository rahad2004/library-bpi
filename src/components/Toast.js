"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_MESSAGE, CLEAR_PATH } from "@/store/constant";
import { Toaster, toast } from "sonner";

const Toast = () => {
  const pathname = usePathname();
  const message = useSelector((state) => state.message);
  const path = useSelector((state) => state.path);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (message?.status) {
      toast[message?.status || "info"](message?.message);

      if (message?.message === "You must login first.") {
        router.push(`/auth/login?next=${encodeURIComponent(pathname)}`);
      } else if (message?.message === "Your account is not approved.") {
        router.push(`/not-approved`);
      } else if (
        message?.message ===
        "Unfortunately you are ban now, please contact to author."
      ) {
        router.push(`/ban`);
      }

      dispatch({ type: CLEAR_MESSAGE });
    }

    if (path) {
      dispatch({ type: CLEAR_PATH });
      router.push(path, { scroll: false });
    }
  }, [message, path]);

  return <Toaster richColors position="top-right" />;
};

export default Toast;
