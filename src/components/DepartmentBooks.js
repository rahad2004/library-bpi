"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fixdeValues } from "@/store/Action.js";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { LOADING_END, LOADING_START } from "@/store/constant";

const DepartmentBooks = ({ departmentPath }) => {
  const dispatch = useDispatch();
  const [books, setBooks] = useState([]);
  const fixedValues = useSelector((state) => state.fixedValues);

  const [collaps, setCollaps] = useState(true);

  useEffect(() => {
    dispatch(
      fixdeValues({
        languages: true,
        countries: true,
        shelves: true,
      })
    );
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value, page: 1 };
    setFilters(newFilters);
    sessionStorage.setItem("bookFiltersDepartment", JSON.stringify(newFilters));
    getDepartmentBooks(newFilters, setBooks, dispatch);
  };

  const [filters, setFilters] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("bookFiltersDepartment");
      return stored
        ? JSON.parse(stored)
        : {
            bookName: "",
            bookAuthor: "",
            publisher: "",
            search: "",
            language: "",
            department: departmentPath,
            country: "",
            shelf: "",
            edition: "",
            mrpMin: "",
            mrpMax: "",
            quantityMin: "",
            quantityMax: "",
            sortBy: "",
            sortOrder: "",
            page: 1,
            limit: 10,
          };
    }
    return {
      bookName: "",
      bookAuthor: "",
      publisher: "",
      search: "",
      language: "",
      department: departmentPath,
      country: "",
      shelf: "",
      edition: "",
      mrpMin: "",
      mrpMax: "",
      quantityMin: "",
      quantityMax: "",
      sortBy: "",
      sortOrder: "",
      page: 1,
      limit: 10,
    };
  });

  useEffect(() => {
    const savedFilters = sessionStorage.getItem("bookFiltersDepartment");
    if (savedFilters) {
      const parsedFilters = JSON.parse(savedFilters);
      getDepartmentBooks(parsedFilters, setBooks, dispatch);
    } else {
      getDepartmentBooks({ department: departmentPath }, setBooks, dispatch);
    }
  }, []);

  const changePage = (newPage) => {
    const newFilters = { ...filters, page: newPage };
    setFilters(newFilters);
    sessionStorage.setItem("bookFiltersDepartment", JSON.stringify(newFilters));
    getDepartmentBooks(newFilters, setBooks, dispatch);
  };

  useEffect(() => {
    if (!collaps) {
      const all = document.querySelectorAll("body, html, #__next, main"); // add others if needed
      all.forEach((el) => (el.style.overflow = "hidden"));
    } else {
      const all = document.querySelectorAll("body, html, #__next, main");
      all.forEach((el) => (el.style.overflow = ""));
    }

    return () => {
      const all = document.querySelectorAll("body, html, #__next, main");
      all.forEach((el) => (el.style.overflow = ""));
    };
  }, [collaps]);

  return (
    <div className="">
      {!collaps && (
        <div
          onClick={() => setCollaps(true)}
          className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-black opacity-80 z-[38] transition-all"
        ></div>
      )}
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-textl dark:text-textd mb-6">
        📚 {departmentPath}
      </h1>
      <div className="flex flex-row gap-6 items-start">
        <div
          className={`z-[40] absolute lg:static bg-white p-6 lg:rounded-xl shadow-[0_0_10px_#00000035] space-y-6 mb-3 transition-all duration-300 w-[80vw] ${
            collaps
              ? "left-[-80vw] top-[64px] rounded-none"
              : "left-[0px] top-[64px] rounded-none"
          } lg:w-[30%] h-[calc(100dvh-64px)] lg:h-[calc(100dvh-220px)] overflow-auto custom-scrollbar bg-bgl1 dark:bg-bgd2 border dark:border-bord dark:shadow-shadl`}
        >
          <div className="flex justify-center items-center">
            <h2 className="text-2xl text-textl dark:text-textd">Filters</h2>
            <button
              className="lg:hidden rounded-full border-none bg-white shadow-[0_0_10px_#00000036] px-2 flex items-center gap-2 fixed top-[93px] right-[5px]"
              onClick={() => setCollaps(!collaps)}
            >
              {collaps ? (
                <>
                  Filters
                  <FaChevronCircleRight />
                </>
              ) : (
                <>
                  Filters
                  <FaChevronCircleLeft />
                </>
              )}
            </button>
          </div>

          <div className="">
            {/* Search Inputs + Button Filters + Slider */}
            <div className="grid grid-cols-1 gap-2">
              <div className="w-full rounded-2xl flex flex-wrap sm:items-start sm:justify-between gap-3">
                {/* Sort By */}
                <fieldset className="w-full sm:w-auto">
                  <legend className="mb-2 text-sm font-semibold text-textl dark:text-textd">
                    Sort By
                  </legend>
                  <div className="flex flex-wrap gap-2 justify-start">
                    {[
                      { label: "Book", value: "bookName" },
                      { label: "Author", value: "bookAuthor" },
                      { label: "Publisher", value: "publisher" },
                      { label: "MRP", value: "mrp" },
                      { label: "Qty", value: "quantity" },
                      { label: "Edition", value: "edition" },
                    ].map(({ label, value }) => (
                      <label
                        key={value}
                        className={`text-sm flex items-center justify-center px-4 py-2 rounded-full border cursor-pointer transition 
            ${
              filters.sortBy === value
                ? "bg-buttonp text-textd border-bord"
                : "hover:bg-blue-100 bg-bgl2 dark:bg-bgd1 text-textl dark:text-textd border border-borl dark:border-bord"
            }`}
                      >
                        <input
                          type="radio"
                          name="sortBy"
                          value={value}
                          checked={filters.sortBy === value}
                          onChange={handleInputChange}
                          className="hidden"
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                </fieldset>

                {/* Sort Order */}
                <fieldset className="w-full sm:w-auto">
                  <legend className="mb-2 text-sm font-semibold text-textl dark:text-textd">
                    Sort Order
                  </legend>
                  <div className="flex gap-4">
                    {[
                      { label: "Ascending", value: "asc" },
                      { label: "Descending", value: "desc" },
                    ].map(({ label, value }) => (
                      <label
                        key={value}
                        className={`text-sm flex items-center justify-center px-4 py-2 rounded-full border cursor-pointer transition 
            ${
              filters.sortOrder === value
                ? "bg-buttonp text-textd border-bord"
                : "hover:bg-blue-100 bg-bgl2 dark:bg-bgd1 text-textl dark:text-textd border border-borl dark:border-bord"
            }`}
                      >
                        <input
                          type="radio"
                          name="sortOrder"
                          value={value}
                          checked={filters.sortOrder === value}
                          onChange={handleInputChange}
                          className="hidden"
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>

              <hr className="border-t border-dashed border-gray-400 mt-3" />
              {/* Text Inputs */}
              {[["search", "Search"]].map(([name, label]) => (
                <div key={name} className="flex flex-col">
                  <label
                    htmlFor={name}
                    className="text-sm font-semibold text-textl dark:text-textd mb-2"
                  >
                    {label}
                  </label>
                  <input
                    id={name}
                    name={name}
                    value={filters[name]}
                    onChange={handleInputChange}
                    placeholder={`Search Book`}
                    className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>
              ))}
              <hr className="border-t border-dashed border-gray-400 mt-3" />
              {/* Button Filters */}
              {[
                ["shelf", "Shelf", fixedValues?.shelves],
                ["country", "Country", fixedValues?.countries],
                ["language", "Language", fixedValues?.languages],
              ].map(([name, label, options]) => (
                <div key={name} className="flex flex-col">
                  <label className="text-sm font-semibold text-textl dark:text-textd mb-2">
                    {label}
                  </label>
                  <div className="w-full flex items-center justify-center flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        handleInputChange({ target: { name, value: "" } })
                      }
                      className={`flex-auto w-max p-[5px] text-[15px] text-center rounded-[10px] shadow-[0_0_3px_#00000012] transition-all
              ${
                filters[name] === ""
                  ? "bg-buttonp text-textd border-bord"
                  : "hover:bg-blue-100 bg-bgl2 dark:bg-bgd1 text-textl dark:text-textd border border-borl dark:border-bord"
              }
            `}
                      aria-pressed={filters[name] === ""}
                    >
                      All
                    </button>
                    {options?.map((option) => (
                      <button
                        key={option._id}
                        type="button"
                        onClick={() =>
                          handleInputChange({
                            target: { name, value: option._id },
                          })
                        }
                        className={`flex-auto w-max p-[5px] text-[15px] text-center rounded-[10px] shadow-[0_0_3px_#00000012] transition-all
                ${
                  filters[name] === option._id
                    ? "bg-buttonp text-textd border-bord"
                    : "hover:bg-blue-100 bg-bgl2 dark:bg-bgd1 text-textl dark:text-textd border border-borl dark:border-bord"
                }
              `}
                        aria-pressed={filters[name] === option.name}
                      >
                        {option.name}
                      </button>
                    ))}
                  </div>
                  <hr className="border-t border-dashed border-gray-400 mt-3" />
                </div>
              ))}

              {/* MRP Range Slider */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-textl dark:text-textd mb-2">
                  MRP Range
                </label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>Min: {filters.mrpMin || 0}</span>
                    <span>Max: {filters.mrpMax || 3000}</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <input
                      type="range"
                      name="mrpMin"
                      min={0}
                      max={filters.mrpMax || 3000}
                      value={filters.mrpMin}
                      onChange={handleInputChange}
                      className="w-full h-2 rounded-lg cursor-pointer accent-blue-600"
                    />
                    <input
                      type="range"
                      name="mrpMax"
                      min={filters.mrpMin || 0}
                      max={3000}
                      value={filters.mrpMax}
                      onChange={handleInputChange}
                      className="w-full h-2 rounded-lg cursor-pointer accent-blue-600"
                    />
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-t border-dashed border-gray-400 m-3" />
            {/* Sort Options */}
          </div>

          {/* Reset Button */}
          <div className="pt-4 flex justify-center">
            <button
              type="button"
              className="bg-buttonw hover:bg-buttona text-white px-5 py-2 rounded-md shadow"
              onClick={() => {
                const defaultFilters = {
                  bookName: "",
                  bookAuthor: "",
                  publisher: "",
                  search: "",
                  language: "",
                  department: departmentPath,
                  country: "",
                  shelf: "",
                  edition: "",
                  mrpMin: "",
                  mrpMax: "",
                  quantityMin: "",
                  quantityMax: "",
                  search: "",
                  sortBy: "",
                  sortOrder: "",
                  page: 1,
                  limit: 10,
                };
                setFilters(defaultFilters);
                sessionStorage.removeItem("bookFiltersDepartment");
                getDepartmentBooks(defaultFilters, setBooks, dispatch);
              }}
            >
              Reset Filters
            </button>
          </div>
        </div>

        {books?.books?.length > 0 ? (
          <div className="w-full lg:w-[70%] flex flex-wrap justify-center gap-6">
            {books.books.map((book, index) => (
              <Link
                key={index}
                href={`/books/${book.slug}`}
                className="max-w-[300px] bg-bgl1 dark:bg-bgd2 border dark:border-bord rounded-xl shadow-md hover:shadow-xl transition-all duration-300  hover:border-buttona dark:hover:border-buttona overflow-hidden flex flex-col w-full h-[340px]"
              >
                {book?.images?.[0]?.url ? (
                  <img
                    src={book.images[0].url}
                    alt={book.bookName}
                    className="w-full h-[150px] object-contain bg-gray-200"
                  />
                ) : (
                  <div className="w-full h-[150px] bg-gray-100 flex items-center justify-center text-gray-400 italic">
                    No Image
                  </div>
                )}

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-textl dark:text-textd line-clamp-1">
                      {book.bookName}
                    </h2>
                    <p className="text-sm text-gray-600 line-clamp-1">
                      By: {book.bookAuthor}
                    </p>
                  </div>
                  <p className="line-clamp-2 text-gray-500 font-thin">
                    {book.description}
                  </p>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-sm bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                      ৳{book.mrp}
                    </span>
                    <span className="text-xs text-gray-400">
                      {book?.department?.name}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex w-full lg:w-[70%] flex-col items-center justify-center py-12 text-center">
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
      {books?.total > 0 && (
        <div className="flex m-auto flex-col sm:flex-row sm:justify-center items-center gap-4 mt-8">
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next →"
            onPageChange={({ selected }) => changePage(selected + 1)}
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            pageCount={Math.ceil(books.total / filters.limit)}
            forcePage={filters.page - 1}
            previousLabel="← Previous"
            containerClassName="flex flex-wrap gap-2 items-center justify-center"
            pageClassName="px-3 py-1 rounded text-sm transition-colors bg-bgl2 dark:bg-bgd2 border border-borl dark:border-bord text-bgd2 dark:text-bgl2 hover:bg-gray-100 dark:hover:bg-gray-800"
            activeClassName="bg-buttonp text-textd dark:bg-buttonp dark:text-bgd1"
            previousClassName="px-3 py-1 rounded text-sm transition-colors bg-bgl2 dark:bg-bgd2 border border-borl dark:border-bord text-bgd2 dark:text-bgl2 hover:bg-gray-100 dark:hover:bg-gray-800"
            nextClassName="px-3 py-1 rounded text-sm transition-colors bg-bgl2 dark:bg-bgd2 border border-borl dark:border-bord text-bgd2 dark:text-bgl2 hover:bg-gray-100 dark:hover:bg-gray-800"
            breakClassName="px-3 py-1 rounded text-bgd2 dark:text-bgl2 bg-bgl2 dark:bg-bgd2 border border-borl dark:border-bord"
            disabledClassName="opacity-50 cursor-not-allowed"
          />
        </div>
      )}
    </div>
  );
};

export default DepartmentBooks;

const getDepartmentBooks = async (filters = {}, setBooks, dispatch) => {
  try {
    dispatch({ type: LOADING_START });
    // Convert filters object to q
    // uery string
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
      }/api/book/all-books?${params.toString()}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const result = await response.json();
    setBooks(result);
  } catch (error) {
    console.error("Error fetching books:", error);
  } finally {
    dispatch({ type: LOADING_END });
  }
};
