// app/books/page.js (Server Component)
import BooksFilterFrom from "@/components/BooksFilterFrom";
import Link from "next/link";
import BookPagination from "./BookPagination";

export default async function AllBooks({ searchParams }) {
  const filters = {
    search: searchParams?.search || "",
    language: searchParams?.language || "",
    department: searchParams?.department || "",
    country: searchParams?.country || "",
    shelf: searchParams?.shelf || "",
    mrpMin: searchParams?.mrpMin || "",
    mrpMax: searchParams?.mrpMax || "",
    sortBy: searchParams?.sortBy || "",
    sortOrder: searchParams?.sortOrder || "",
    page: parseInt(searchParams?.page) || 1,
    limit: parseInt(searchParams?.limit) || 10,
  };

  // Fetch books with the filters
  const books = await getAllBooks(filters);

  return (
    <div className="">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-textl dark:text-textd mb-6">
        📚 Books
      </h1>
      <div className="flex flex-row gap-6 items-start">
        <BooksFilterFrom initialFilters={filters} />

        {books?.books?.length > 0 ? (
          <div className="w-full lg:w-[70%] flex flex-wrap justify-center gap-6">
            {books.books.map((book, index) => (
              <Link
                key={index}
                href={`/books/${book.slug}`}
                className="max-w-[300px] bg-bgl1 dark:bg-bgd2 border dark:border-bord rounded-xl shadow-md hover:shadow-xl hover:border-buttona dark:hover:border-buttona transition-all duration-300 overflow-hidden flex flex-col w-full h-[340px]"
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
      <BookPagination filters={filters} total={books?.total || 0} />
    </div>
  );
}


async function getAllBooks(filters = {}) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      params.append(key, value);
    }
  });

  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_BACKEND_URL
    }/api/book/all-books?${params.toString()}`,
    {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }

  return response.json();
}
