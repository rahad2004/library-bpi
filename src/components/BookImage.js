"use client";
import React, { useState } from "react";

const BookImage = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  return (
    <>
      <div className="flex flex-col items-center gap-4 w-[100%] md:w-[48%]">
        {images?.length > 0 ? (
          <div className="relative w-full max-w-md mx-auto aspect-[4/5]">
            <img
              src={images[currentIndex]?.url}
              alt={`Book image ${currentIndex + 1}`}
              className="absolute top-0 left-0 w-full h-full object-contain rounded-xl shadow-xl bg-bgl1 dark:bg-bgd2 border dark:border-bord shadow-shadl dark:shadow-shadd"
            />

            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-bgd1 dark:bg-bgl1 bg-opacity-30 text-textd dark:text-textl border border-bord dark:border-borl p-2 rounded-full hover:bg-opacity-60"
            >
              ‹
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-bgd1 dark:bg-bgl1 bg-opacity-30 text-textd dark:text-textl border border-bord dark:border-borl p-2 rounded-full hover:bg-opacity-60"
            >
              ›
            </button>
          </div>
        ) : (
          <div className="w-full max-w-md h-64 bg-gray-100 flex items-center justify-center rounded-xl text-gray-400">
            No Image Available
          </div>
        )}

        {/* Thumbnails (Optional) */}
        {images?.length > 1 && (
          <div className="flex gap-2 flex-wrap justify-center">
            {images.map((img, i) => (
              <img
                key={i}
                src={img.url}
                className={`w-16 h-16 object-cover rounded border ${
                  i === currentIndex ? "border-blue-500" : "border-transparent"
                } cursor-pointer`}
                onClick={() => setCurrentIndex(i)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default BookImage;
