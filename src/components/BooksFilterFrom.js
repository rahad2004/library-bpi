// components/BooksFilterFrom.js (Client Component)
"use client";

import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { FaChevronCircleRight, FaChevronCircleLeft } from "react-icons/fa";
import { fixdeValues } from "@/store/Action";
import { useRouter, useSearchParams } from "next/navigation";

const BooksFilterFrom = ({ initialFilters }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState(initialFilters);
  const fixedValues = useSelector((state) => state.fixedValues);
  const dispatch = useDispatch();
  const [collaps, setCollaps] = useState(true);

  useEffect(() => {
    dispatch(
      fixdeValues({
        departments: true,
        shelves: true,
        countries: true,
        languages: true,
      })
    );
  }, []);

  const updateSearchParams = (newFilters) => {
    const params = new URLSearchParams(searchParams);
    
    // Remove all existing params
    Array.from(params.keys()).forEach(key => params.delete(key));
    
    // Set new params
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== "" && value !== null) {
        params.set(key, value.toString());
      }
    });

    router.push(`?${params.toString()}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value, page: 1 };
    setFilters(newFilters);
    updateSearchParams(newFilters);
  };

  useEffect(() => {
    if (!collaps) {
      const all = document.querySelectorAll("body, html, #__next, main");
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
    <>
      {!collaps && (
        <div
          onClick={() => setCollaps(true)}
          className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-black opacity-80 z-[38] transition-all"
        ></div>
      )}
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
            className="z-[42] lg:hidden rounded-full border-none bg-white shadow-[0_0_10px_#00000036] px-2 flex items-center gap-2 fixed top-[93px] right-[5px]"
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
          <div className="grid grid-cols-1 gap-2">
            <div className="w-full rounded-2xl flex flex-wrap sm:items-start sm:justify-between gap-3">
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
            {[
              ["department", "Department", fixedValues?.departments],
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
        </div>

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
                department: "",
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
              updateSearchParams(defaultFilters);
            }}
          >
            Reset Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default BooksFilterFrom;