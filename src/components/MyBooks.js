"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  authenticated,
  cancelReturnRequest,
  getRequestedBooks,
  gettingRequestCancel,
  returnRequest,
} from "@/store/Action.js";
import { useRouter } from "next/navigation";

const MyBooks = () => {
  const [filters, setFilters] = useState({});
  const [activeFilter, setActiveFilter] = useState("all");
  const dispatch = useDispatch();
  const myBooks = useSelector((state) => state.myBooks);
  const role = useSelector((state) => state.role);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const isLoading = useSelector((state) => state.isLoading);
  const auth_loaded = useSelector((state) => state.auth_loaded);
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    dispatch(authenticated());
  }, []);

  useEffect(() => {
    if (auth_loaded && !isLoading && !isAuthenticated) {
      router.push("/auth/login?next=/books/my-books");
    }
  }, [isAuthenticated, auth_loaded, isLoading]);

  useEffect(() => {
    if (role) {
      dispatch(getRequestedBooks(filters, role));
    }
  }, [role, filters]);

  const handleClick = (action) => {
    if (isButtonDisabled) return;
    setIsButtonDisabled(true);
    setTimeout(() => setIsButtonDisabled(false), 5000);
    action();
  };

  return (
    <div className="w-full mx-auto mb-auto">
      {/* Header */}
      <div className="mb-8 mt-6">
        <h1 className="text-2xl md:text-3xl font-bold text-textl dark:text-textd mb-4 text-center">
          My Books
        </h1>

        {/* Filter Buttons - Responsive */}
        <div className="flex flex-wrap gap-2 justify-center pb-2">
          {[
            { id: "all", label: "All" },
            {
              id: "gettingRequested",
              label: "Getting Requested",
              filter: { takingApproveBy: false },
            },
            {
              id: "inCollection",
              label: "In My Collection",
              filter: { takingApproveBy: true, returnApproveBy: false },
            },
            {
              id: "returnRequested",
              label: "Return Requested",
              filter: {
                takingApproveBy: true,
                returnRequestDate: true,
                returnApproveBy: false,
              },
            },
            {
              id: "alreadyRead",
              label: "Already Returned",
              filter: { takingApproveBy: true, returnApproveBy: true },
            },
          ].map(({ id, label, filter }) => (
            <button
              key={id}
              onClick={() => {
                setFilters(filter || {});
                setActiveFilter(id);
              }}
              className={`px-4 py-2 rounded-full text-sm md:text-base whitespace-nowrap transition-all duration-200 ${
                activeFilter === id
                ? "bg-buttonp text-textd border-bord"
                : "hover:bg-blue-100 bg-bgl2 dark:bg-bgd2 text-textl dark:text-textd border border-borl dark:border-bord"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Book List */}
      {myBooks?.bookTeachers?.length || myBooks?.bookStudents?.length > 0 ? (
        <div className="flex flex-row flex-wrap gap-3 justify-center mb-3">
          {(role === "teacher"
            ? myBooks?.bookTeachers
            : myBooks?.bookStudents
          )?.map((item, index) => (
            <div
              key={index}
              className="max-w-[550px] w-full bg-bgl1 dark:bg-bgd2 rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-300 overflow-hidden border dark:border-bord border-borl dark:border-bord"
            >
              <div className="flex flex-col md:flex-row items-center">
                {/* Book Image */}
                <div className="w-[130px] flex items-center h-auto bg-gray-100 flex-shrink-0">
                  {item?.book?.images?.[0]?.url ? (
                    <img
                      src={item?.book?.images[0].url}
                      alt={item?.book?.bookName}
                      className="w-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Book Details */}
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex-1">
                    <h2 className="line-clamp-1 text-lg md:text-xl font-semibold text-textl dark:text-textd mb-1 hover:text-blue-600 transition-colors">
                      <Link href={`/books/${item?.book?.slug}`}>
                        {item?.book?.bookName}
                      </Link>
                    </h2>
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-semibold">Author:</span>{" "}
                      {item?.book?.bookAuthor}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Book Number:</span>{" "}
                      {item?.bookNumber}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Department:</span>{" "}
                      {item?.book?.department?.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">সংগ্রহের তারিখ:</span>{" "}
                      {item?.takingRequestDate?.date}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">ফেরতের তারিখ:</span>{" "}
                      {item?.returnApproveDate?.date || "N/A"}
                    </p>
                  </div>

                  <div className="pt-3 mt-2 border-t dark:border-bord flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <span className="text-base font-medium text-green-700">
                      ৳{item?.book?.mrp}
                    </span>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2">
                      {item?.takingApproveBy == null && (
                        <button
                          onClick={() =>
                            handleClick(() => {
                              dispatch(
                                gettingRequestCancel(item?._id, role, filters)
                              );
                            })
                          }
                          disabled={isButtonDisabled}
                          className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                            isButtonDisabled
                              ? "bg-gray-300 cursor-not-allowed"
                              : "bg-red-600 hover:bg-red-700 text-white"
                          }`}
                        >
                          সংগ্রহের অনুরোধ বাতিল করুন
                        </button>
                      )}

                      {item?.takingApproveBy &&
                        !item?.returnApproveBy &&
                        !item?.returnRequestDate && (
                          <button
                            onClick={() =>
                              handleClick(() => {
                                dispatch(
                                  returnRequest(item?._id, role, filters)
                                );
                              })
                            }
                            disabled={isButtonDisabled}
                            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                              isButtonDisabled
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700 text-white"
                            }`}
                          >
                            ফেরত দিন
                          </button>
                        )}

                      {item?.takingApproveBy &&
                        !item?.returnApproveBy &&
                        item?.returnRequestDate && (
                          <button
                            onClick={() =>
                              handleClick(() => {
                                dispatch(
                                  cancelReturnRequest(item?._id, role, filters)
                                );
                              })
                            }
                            disabled={isButtonDisabled}
                            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                              isButtonDisabled
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-red-600 hover:bg-red-700 text-white"
                            }`}
                          >
                            ফেরত বাদ দিন
                          </button>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-700 mb-1">
            No books found
          </h3>
          <p className="text-gray-500 text-sm">Try changing your filters</p>
        </div>
      )}
    </div>
  );
};

export default MyBooks;
