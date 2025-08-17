// components/BookPagination.js (Client Component)
"use client";
import React from "react";
import ReactPaginate from "react-paginate";
import { useRouter, useSearchParams } from "next/navigation";

const BookPagination = ({ filters, total }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const changePage = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage);
    router.push(`?${params.toString()}`);
  };

  return (
    <>
      {total > 0 && (
        <div className="flex m-auto flex-col sm:flex-row sm:justify-center items-center gap-4 mt-8">
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next →"
            onPageChange={({ selected }) => changePage(selected + 1)}
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            pageCount={Math.ceil(total / filters.limit)}
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
    </>
  );
};

export default BookPagination;