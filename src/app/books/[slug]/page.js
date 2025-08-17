// app/books/[slug]/page.js
import BookDetails from "@/components/BookDetails";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  // Example API call using slug
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/book/get-book/${slug}`,
    {
      cache: "no-store",
    }
  );

  const book = await res.json();
  if (book.data.length <= 0) {
    return notFound();
  }
  return {
    title: "LMS | " + book.data[0].bookName,
    description: book.data[0].description || "Details of the book",
  };
}

export default async function Page({ params }) {
  const { slug } = await params;

  // Example API call using slug
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/book/get-book/${slug}`,
    {
      cache: "no-store",
    }
  );

  const book = await res.json();
  if (book.data.length <= 0) {
    return notFound();
  }

  return <BookDetails book={{ ...book.data[0] }} />;
}
