"use client";
import { fixdeValues } from "@/store/Action";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";

const DepartmentTabs = ({ activeDepartment }) => {
  const scrollRef = useRef();
  const [departments, setDepartments] = useState([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Fetch departments on mount
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/fixed-values/all-values?departments=true`,
          { method: "GET", credentials: "include" }
        );
        const result = await response.json();
        setDepartments(result?.departments || []);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, []);

  // Update scroll button states
  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth);
  };

  // Add scroll event listener to update buttons
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", updateScrollButtons);
    updateScrollButtons();

    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
    };
  }, [departments]);

  // Scroll left or right by 150px
  const scrollBy = (distance) => {
    scrollRef.current.scrollBy({ left: distance, behavior: "smooth" });
  };

  // Drag-to-scroll logic (unchanged)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    const mouseDownHandler = (e) => {
      isDown = true;
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
      el.style.cursor = "grabbing";
    };

    const mouseLeaveHandler = () => {
      isDown = false;
      el.style.cursor = "grab";
    };

    const mouseUpHandler = () => {
      isDown = false;
      el.style.cursor = "grab";
    };

    const mouseMoveHandler = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 2; // scroll-fast
      el.scrollLeft = scrollLeft - walk;
    };

    el.addEventListener("mousedown", mouseDownHandler);
    el.addEventListener("mouseleave", mouseLeaveHandler);
    el.addEventListener("mouseup", mouseUpHandler);
    el.addEventListener("mousemove", mouseMoveHandler);

    return () => {
      el.removeEventListener("mousedown", mouseDownHandler);
      el.removeEventListener("mouseleave", mouseLeaveHandler);
      el.removeEventListener("mouseup", mouseUpHandler);
      el.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);

  return (
    <>
      {departments.length <= 0 ? (
        <div className="bg-bgl1 text-textl max-h-[50px] dark:bg-bgd1 dark:text-textd shadow-lg shadow-shadl dark:shadow-shadd mb-4 flex items-center select-none py-2">
          {/* Left scroll button skeleton */}
          <div className="hidden lg:flex items-center justify-center px-3 py-2 mr-2 rounded-md border border-gray-300 bg-gray-100 animate-pulse w-[40px] h-[40px]" />
          <div className="overflow-x-auto no-scrollbar flex-1">
            <div className="flex whitespace-nowrap gap-10 px-4 py-3">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="h-4 w-[150px] bg-gray-200 rounded animate-pulse"
                />
              ))}
            </div>
          </div>
          <div className="hidden lg:flex items-center justify-center px-3 py-2 ml-2 rounded-md border border-gray-300 bg-gray-100 animate-pulse w-[40px] h-[40px]" />
        </div>
      ) : (
        <div className="bg-bgl1 text-textl max-h-[50px] dark:bg-bgd1 dark:text-textd shadow-md shadow-shadl dark:shadow-shadd mb-4 flex items-center select-none shadd border-b dark:border-b-bord">
          {/* Left scroll button */}
          <button
            onClick={() => scrollBy(-150)}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            className="hidden lg:flex items-center justify-center px-3 py-2 mr-2 rounded-md border border-gray-300 bg-bgl1 hover:bg-gray-100 dark:bg-bgd1 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div
            ref={scrollRef}
            className="overflow-x-auto no-scrollbar cursor-grab flex-1"
            style={{ scrollBehavior: "smooth" }}
          >
            <div className="flex whitespace-nowrap gap-10 px-4 py-3">
              {departments.map(({ name, _id }) => (
                <Link
                  key={_id}
                  href={`/books/department/${name}`}
                  className={`pb-0 border-b-2 transition-colors duration-200 ${
                    activeDepartment === name
                      ? "text-buttonp border-buttonp"
                      : "border-transparent hover:text-buttonp hover:border-buttonp"
                  }`}
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right scroll button */}
          <button
            onClick={() => scrollBy(150)}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            className="hidden lg:flex items-center justify-center px-3 py-2 ml-2 rounded-md border border-gray-300 bg-bgl1 hover:bg-gray-100 dark:bg-bgd1 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default DepartmentTabs;
