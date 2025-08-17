import BookImage from "./BookImage";
import ReadBook from "./ReadBook";
import RequestForBook from "./RequestForBook";

const BookDetails = ({ book }) => {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex flex-wrap gap-4 justify-between">
        {/* Title */}
        <div className="w-[100%] flex justify-center items-center mb-3">
          <div>
            <h1 className="text-3xl font-bold text-textl dark:text-textd text-center">
              {book?.bookName}
            </h1>
            <p className="text-sm text-gray-500 text-center">
              by {book?.bookAuthor}
            </p>
          </div>
        </div>
        {/* Right: Book Image */}
        <BookImage images={book?.images} />
        {/* Left: Book Info */}
        <div className="space-y-6  w-[100%] md:w-[48%]">
          <div className="flex flex-wrap items-center justify-around gap-2">
            {book?.images?.length > 1 && <ReadBook images={book?.images} />}
            {book?.quantity > 0 ? (
              <RequestForBook id={book?._id} />
            ) : (
              <p className="text-red-500">The Book Currently Not Available</p>
            )}
          </div>

          {/* Detail Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            <DetailItem label="Edition" value={book?.edition} />
            <DetailItem label="Publisher" value={book?.publisher} />
            <DetailItem label="Shelf" value={book?.shelf?.name} />
            <DetailItem label="Quantity" value={book?.quantity} />
            <DetailItem label="MRP" value={`৳${book?.mrp}`} />
            <DetailItem label="Pages" value={book?.numberOfPages} />
            <DetailItem label="Language" value={book?.language?.name} />
            <DetailItem label="Country" value={book?.country?.name} />
          </div>

          {/* Book Numbers */}
          {book?.bookNumbers?.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-1">
                Book Numbers
              </h2>
              <div className="flex flex-wrap gap-2">
                {book?.bookNumbers.map((num, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm"
                  >
                    {num}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Created & Updated Info */}
          <div className="grid sm:grid-cols-2 gap-4">
            <DetailItem
              label="Created On"
              value={`${book?.createDate?.date}, ${book?.createDate?.formatedTime}`}
            />
            <DetailItem
              label="Updated On"
              value={`${book?.updateDate?.date}, ${book?.updateDate?.formatedTime}`}
            />
          </div>
        </div>
        {/* Description */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-textl dark:text-textd mb-2">
            Description
          </h2>
          <pre className="bg-bgl2 dark:bg-bgd2 text-textl dark:text-textd border dark:border-bord rounded-md p-4 text-gray-700 whitespace-pre-wrap break-words max-w-full overflow-x-auto text-sm leading-relaxed">
            {book?.description}
          </pre>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <div className="bg-bgl1 dark:bg-bgd2 border dark:border-bord shadow dark:shadow-shadl rounded-lg p-4">
    <p className="text-xs text-textl dark:text-textd opacity-70">{label}</p>
    <p className="text-base font-medium text-textl dark:text-textd">{value || "N/A"}</p>
  </div>
);

export default BookDetails;
