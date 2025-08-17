import {
  AUTHENTICATED,
  GET_FIXED_VALUES,
  LOADING_END,
  LOADING_START,
  MESSAGE,
  MY_BOOKS,
} from "./constant";

export const otpSend = (email, role) => async (dispatch) => {
  dispatch({
    type: LOADING_START,
  });

  try {
    let backend_path;
    if (role == "teacher") {
      backend_path = "/api/teacher";
    } else {
      backend_path = "/api/student";
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}${backend_path}/getotp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    const result = await response.json();

    if (result.success) {
      dispatch({
        type: MESSAGE,
        payload: { message: result.message, status: "success", path: "" },
      });
    } else {
      dispatch({
        type: MESSAGE,
        payload: {
          message: result.error || "Registration failed",
          status: "error",
          path: "",
        },
      });
    }
  } catch (error) {
    dispatch({
      type: MESSAGE,
      payload: {
        message: error.message || "Something went wrong",
        status: "error",
        path: "",
      },
    });
  } finally {
    dispatch({
      type: LOADING_END,
    });
  }
};

export const register = (data, role) => async (dispatch) => {
  dispatch({
    type: LOADING_START,
  });

  try {
    let backend_path;
    if (role == "teacher") {
      backend_path = "/api/teacher";
    } else {
      backend_path = "/api/student";
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}${backend_path}/register`,
      {
        method: "POST",
        body: data,
      }
    );

    const result = await response.json();

    if (result.success) {
      dispatch({
        type: MESSAGE,
        payload: {
          message: result.message || "Account Creation Succesfull",
          status: "success",
          path: "/auth/login",
        },
      });
    } else {
      dispatch({
        type: MESSAGE,
        payload: {
          message: result.error || "Registration failed",
          status: "error",
          path: "",
        },
      });
    }
  } catch (error) {
    dispatch({
      type: MESSAGE,
      payload: {
        message: error.message || "Something went wrong",
        status: "error",
        path: "",
      },
    });
  } finally {
    dispatch({
      type: LOADING_END,
    });
  }
};
export const login =
  ({ email, password }, role, next) =>
  async (dispatch) => {
    dispatch({
      type: LOADING_START,
    });

    try {
      let backend_path;
      if (role == "teacher") {
        backend_path = "/api/teacher";
      } else {
        backend_path = "/api/student";
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${backend_path}/login`,
        {
          method: "POST",

          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const result = await response.json();

      if (result.success) {
        dispatch({
          type: MESSAGE,
          payload: {
            message: result.message || "Login Succesfull",
            status: "success",
            path: next,
          },
        });
        dispatch(authenticated());
      } else {
        dispatch({
          type: MESSAGE,
          payload: {
            message: result.error || "Login failed",
            status: "error",
            path: "",
          },
        });
      }
    } catch (error) {
      dispatch({
        type: MESSAGE,
        payload: {
          message: error.message || "Something went wrong",
          status: "error",
          path: "",
        },
      });
    } finally {
      dispatch({
        type: LOADING_END,
      });
    }
  };

export const forgotPassword = (email, role) => async (dispatch) => {
  dispatch({
    type: LOADING_START,
  });

  try {
    let backend_path;
    if (role == "teacher") {
      backend_path = "/api/teacher";
    } else {
      backend_path = "/api/student";
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}${backend_path}/forgate-password`,
      {
        method: "POST",

        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    const result = await response.json();

    if (result.success) {
      dispatch({
        type: MESSAGE,
        payload: {
          message: result.message || "An Email send",
          status: "success",
          path: `/auth/login`,
        },
      });
    } else {
      dispatch({
        type: MESSAGE,
        payload: {
          message: result.error || "Somthing wrong",
          status: "error",
          path: "",
        },
      });
    }
  } catch (error) {
    dispatch({
      type: MESSAGE,
      payload: {
        message: error.message || "Something went wrong",
        status: "error",
        path: "",
      },
    });
  } finally {
    dispatch({
      type: LOADING_END,
    });
  }
};
export const resetPassword =
  (newPassword, confirmPassword, token, role) => async (dispatch) => {
    dispatch({
      type: LOADING_START,
    });

    try {
      let backend_path;
      if (role == "teacher") {
        backend_path = "/api/teacher";
      } else {
        backend_path = "/api/student";
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${backend_path}/reset-password`,
        {
          method: "POST",

          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newPassword, confirmPassword, token }),
        }
      );

      const result = await response.json();

      if (result.success) {
        dispatch({
          type: MESSAGE,
          payload: {
            message: result.message || "Password Reset Successfull",
            status: "success",
            path: `/auth/login`,
          },
        });
      } else {
        dispatch({
          type: MESSAGE,
          payload: {
            message: result.error || "Somthing wrong",
            status: "error",
            path: "",
          },
        });
      }
    } catch (error) {
      dispatch({
        type: MESSAGE,
        payload: {
          message: error.message || "Something went wrong",
          status: "error",
          path: "",
        },
      });
    } finally {
      dispatch({
        type: LOADING_END,
      });
    }
  };

export const logout = (role) => async (dispatch) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${role}/logout`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (response.ok) {
      dispatch({
        type: MESSAGE,
        payload: {
          message: "Logout Success",
          status: "success",
          path: "",
        },
      });
      dispatch(authenticated());
    }
  } catch (error) {
    console.log(error);
  }
};

export const authenticated = () => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_START,
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/authenticated`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const json = await response.json();

    if (json.success) {
      dispatch({
        type: AUTHENTICATED,
        payload: {
          success: json.success,
          role: json.role,
          profile: json.profile,
        },
      });
    } else {
      dispatch({
        type: AUTHENTICATED,
        payload: { success: false, role: "", profile: {} },
      });
    }
  } catch (error) {
    dispatch({
      type: AUTHENTICATED,
      payload: { success: false, role: "", profile: {} },
    });
  } finally {
    dispatch({
      type: LOADING_END,
    });
    dispatch({
      type: "Auth_Loaded",
    });
  }
};

export const fixdeValues = (filters) => async (dispatch) => {
  dispatch({
    type: LOADING_START,
  });

  try {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        params.append(key, value);
      }
    });
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BACKEND_URL
      }/api/fixed-values/all-values?${params.toString()}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const result = await response.json();

    if (result) {
      dispatch({
        type: GET_FIXED_VALUES,
        payload: result,
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch({
      type: LOADING_END,
    });
  }
};

export const completeStudentProfile = (role, data) => async (dispatch) => {
  dispatch({ type: LOADING_START });

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/student/add-profile-details`,
      {
        method: "POST",
        body: data, // FormData with optional file
        credentials: "include",
      }
    );

    const result = await response.json();

    if (result.success) {
      dispatch({
        type: MESSAGE,
        payload: {
          message: "Profile Details Completed",
          status: "success",
          path: `/books`,
        },
      });
    } else {
      dispatch({
        type: MESSAGE,
        payload: {
          message: result.error || "Failed to update student profile",
          status: "error",
          path: "",
        },
      });
    }
  } catch (error) {
    dispatch({
      type: MESSAGE,
      payload: {
        message: error.message || "Something went wrong",
        status: "error",
        path: "",
      },
    });
  } finally {
    dispatch({ type: LOADING_END });
  }
};
export const completeTeacherProfile = (role, data) => async (dispatch) => {
  dispatch({ type: LOADING_START });

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/teacher/add-profile-details`,
      {
        method: "POST",
        body: data, // FormData with optional file
        credentials: "include",
      }
    );

    const result = await response.json();

    if (result.success) {
      dispatch({
        type: MESSAGE,
        payload: {
          message: "Profile Details Completed",
          status: "success",
          path: `/books`,
        },
      });
    } else {
      dispatch({
        type: MESSAGE,
        payload: {
          message: result.error || "Failed to update profile",
          status: "error",
          path: "",
        },
      });
    }
  } catch (error) {
    dispatch({
      type: MESSAGE,
      payload: {
        message: error.message || "Something went wrong",
        status: "error",
        path: "",
      },
    });
  } finally {
    dispatch({ type: LOADING_END });
  }
};

export const requestForBook = (id, role) => async (dispatch) => {
  dispatch({ type: LOADING_START });

  try {
    let backend_path;
    if (role == "teacher") {
      backend_path = `/api/take-book/teacher/book-take-request/${id}`;
    } else {
      backend_path = `/api/take-book/student/book-take-request/${id}`;
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}${backend_path}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const result = await response.json();

    if (result.success) {
      dispatch({
        type: MESSAGE,
        payload: {
          message: "Request For this Book Successfull",
          status: "success",
          path: "/books/my-books",
        },
      });
    } else {
      dispatch({
        type: MESSAGE,
        payload: {
          message: result.error,
          status: "error",
          path: "",
        },
      });
    }
  } catch (error) {
    console.error("Failed to fetch book by slug:", error);
  } finally {
    dispatch({ type: LOADING_END });
  }
};

export const gettingRequestCancel = (id, role, filters) => async (dispatch) => {
  dispatch({ type: LOADING_START });

  try {
    let backend_path;
    if (role == "teacher") {
      backend_path = `/api/take-book/teacher/book-take-request-cancel/${id}`;
    } else {
      backend_path = `/api/take-book/student/book-take-request-cancel/${id}`;
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}${backend_path}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const result = await response.json();

    if (result.success) {
      dispatch({
        type: MESSAGE,
        payload: {
          message: "Getting Request Cancelled",
          status: "success",
          path: "",
        },
      });
      dispatch(getRequestedBooks(filters, role));
    } else {
      dispatch({
        type: MESSAGE,
        payload: {
          message: result.error,
          status: "error",
          path: "",
        },
      });
    }
  } catch (error) {
    console.error("Failed to fetch book by slug:", error);
  } finally {
    dispatch({ type: LOADING_END });
  }
};
export const returnRequest = (id, role, filters) => async (dispatch) => {
  dispatch({ type: LOADING_START });

  try {
    let backend_path;
    if (role == "teacher") {
      backend_path = `/api/take-book/teacher/book-return-request/${id}`;
    } else {
      backend_path = `/api/take-book/student/book-return-request/${id}`;
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}${backend_path}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const result = await response.json();

    if (result.success) {
      dispatch({
        type: MESSAGE,
        payload: {
          message: "Return Request Successfull",
          status: "success",
          path: "",
        },
      });
      dispatch(getRequestedBooks(filters, role));
    } else {
      dispatch({
        type: MESSAGE,
        payload: {
          message: result.error || "Somthing Wrong!",
          status: "error",
          path: "",
        },
      });
    }
  } catch (error) {
    console.error("Failed to fetch book by slug:", error);
  } finally {
    dispatch({ type: LOADING_END });
  }
};
export const cancelReturnRequest = (id, role, filters) => async (dispatch) => {
  dispatch({ type: LOADING_START });

  try {
    let backend_path;
    if (role == "teacher") {
      backend_path = `/api/take-book/teacher/book-return-request-cancel/${id}`;
    } else {
      backend_path = `/api/take-book/student/book-return-request-cancel/${id}`;
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}${backend_path}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const result = await response.json();

    if (result.success) {
      dispatch({
        type: MESSAGE,
        payload: {
          message: "Cancel Return Request Successfull",
          status: "success",
          path: "",
        },
      });
      dispatch(getRequestedBooks(filters, role));
    } else {
      dispatch({
        type: MESSAGE,
        payload: {
          message: result.error || "Somthing Wrong",
          status: "error",
          path: "",
        },
      });
    }
  } catch (error) {
    console.error("Failed to fetch book by slug:", error);
  } finally {
    dispatch({ type: LOADING_END });
  }
};

export const getRequestedBooks =
  (filters = {}, role) =>
  async (dispatch) => {
    dispatch({ type: LOADING_START });

    try {
      let backend_path;
      if (role == "teacher") {
        backend_path = `/api/take-book/teacher/get-borrow-lists`;
      } else {
        backend_path = `/api/take-book/student/get-borrow-lists`;
      }
      // Convert filters object to query string
      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          params.append(key, value);
        }
      });

      // You can set page/limit dynamically if needed
      params.set("page", filters.page || 1);
      params.set("limit", filters.limit || 10);

      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_BACKEND_URL
        }${backend_path}?${params.toString()}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const result = await response.json();

      if (result.success) {
        dispatch({
          type: MY_BOOKS,
          payload: result,
        });
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      dispatch({ type: LOADING_END });
    }
  };

export const updateStudent = (data) => async (dispatch) => {
  dispatch({ type: LOADING_START });

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/student/update-profile`,
      {
        method: "POST",
        body: data, // FormData with optional file
        credentials: "include",
      }
    );

    const result = await response.json();

    if (result.success) {
      dispatch({
        type: MESSAGE,
        payload: {
          message: "Profile Updated",
          status: "success",
          path: "/profile",
        },
      });
    } else {
      dispatch({
        type: MESSAGE,
        payload: {
          message: result.error || "Failed to update student profile",
          status: "error",
          path: "",
        },
      });
    }
  } catch (error) {
    dispatch({
      type: MESSAGE,
      payload: {
        message: error.message || "Something went wrong",
        status: "error",
        path: "",
      },
    });
  } finally {
    dispatch({ type: LOADING_END });
  }
};

export const updateTeacher = (data) => async (dispatch) => {
  dispatch({ type: LOADING_START });

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/teacher/update-profile`,
      {
        method: "POST",
        body: data, // FormData with optional file
        credentials: "include",
      }
    );

    const result = await response.json();

    if (result.success) {
      dispatch({
        type: MESSAGE,
        payload: {
          message: "Profile Updated",
          status: "success",
          path: "/profile",
        },
      });
    } else {
      dispatch({
        type: MESSAGE,
        payload: {
          message: result.error || "Failed to update teacher profile",
          status: "error",
          path: "",
        },
      });
    }
  } catch (error) {
    dispatch({
      type: MESSAGE,
      payload: {
        message: error.message || "Something went wrong",
        status: "error",
        path: "",
      },
    });
  } finally {
    dispatch({ type: LOADING_END });
  }
};

export const updateProfilePassword = (data, role) => async (dispatch) => {
  dispatch({ type: LOADING_START });

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${role}/update-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      }
    );

    const result = await response.json();

    if (result.success) {
      dispatch({
        type: MESSAGE,
        payload: {
          message: "Password Updated Successfully!",
          status: "success",
          path: `/profile`,
        },
      });
    } else {
      dispatch({
        type: MESSAGE,
        payload: {
          message: result.error || "Failed to update password",
          status: "error",
          path: "",
        },
      });
    }
  } catch (error) {
    dispatch({
      type: MESSAGE,
      payload: {
        message: error.message || "Something went wrong",
        status: "error",
        path: "",
      },
    });
  } finally {
    dispatch({ type: LOADING_END });
  }
};
