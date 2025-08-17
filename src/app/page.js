/* eslint-disable @next/next/no-img-element */
import DepartmentTabs from "@/components/DepartmentTabs";
import Link from "next/link";

export default async function Home() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/fixed-values/all-values?departments=true`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  const result = await response.json();

  return (
    <main className="font-sans bg-bgl2 dark:bg-bgd1 text-textl dark:text-textd">
      {/* Hero Section */}
      <DepartmentTabs activeDepartment={"all"} />
      <section className="flex flex-col-reverse md:flex-row items-center max-w-7xl mx-auto px-6 py-20 gap-10">
        {/* Left Content */}
        <div className="flex-1 space-y-6 text-center md:text-left">
          <h1 className="text-3xl font-extrabold leading-loose text-indigo-900 dark:text-textd">
            <span className="text-purple-600">
              বগুড়া পলিটেকনিক ইনস্টিটিউটের
            </span>
            <br />
            ডিজিটাল লাইব্রেরিতে আপনাকে স্বাগতম।
          </h1>
          <p className="text-lg md:text-xl max-w-xl text-indigo-700 dark:text-textd">
            শিক্ষার্থী এবং শিক্ষকদের জন্য লাইব্রেরি থেকে পাঠ্যপুস্তক সংগ্রহের
            জন্য একটি অফিসিয়াল প্ল্যাটফর্ম — সবই বিনামূল্যে।
          </p>

          <div className="flex flex-wrap gap-4 mt-6 justify-center md:justify-start">
            <Link
              href="/books"
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-lg transition"
            >
              Browse Books
            </Link>
            <Link
              href="/auth/register"
              className="px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-100 transition"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1">
          <img
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80"
            alt="Students reading books in library"
            className="rounded-xl shadow-xl mx-auto max-w-full"
          />
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="bg-white py-16 shadow-inner bg-bgl2 dark:bg-bgd2">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-indigo-900 dark:text-textd mb-8">
            কেন BPI লাইব্রেরি প্ল্যাটফর্ম ব্যবহার করবেন?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-buttonp dark:text-textd">
            {[
              {
                title: "✅ ফ্রি আর উন্মুক্ত ব্যবহার",
                desc: "কোনো রকম টাকা-পয়সা লাগবে না — এক ক্লিকেই অনেকগুলো একাডেমিক বই আর দরকারি জিনিসপত্র পাওয়া যাবে।",
                icon: (
                  <svg
                    className="w-10 h-10 mx-auto mb-3 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 20h9" />
                    <path d="M12 4v16" />
                    <path d="M3 8h7" />
                  </svg>
                ),
              },
              {
                title: "🎓 শিক্ষার্থী-শিক্ষকের জন্যই বানানো",
                desc: "শিক্ষার্থী আর স্যার-ম্যাডামদের কাজে লাগবে এমনভাবে সাজানো — নিজের মতো করে একাউন্ট আর দরকারি রিসোর্স পাওয়া যাবে।",
                icon: (
                  <svg
                    className="w-10 h-10 mx-auto mb-3 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                ),
              },
              {
                title: "📚 সহজে বই ধার নেওয়া যায়",
                desc: "ডিজিটাল বই খুব সহজেই ধার নিতে পারবেন, সাথে সাথে মিলে যাবে — যেকোনো ডিভাইসে, যখন খুশি পড়া যাবে।",
                icon: (
                  <svg
                    className="w-10 h-10 mx-auto mb-3 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                ),
              },
              {
                title: "🏛️ বিভাগ অনুযায়ী সাজানো",
                desc: "কোন ডিপার্টমেন্ট, বিষয় বা লেখকের বই লাগবে — খুঁজে পাওয়া যাবে একদম সহজে।",
                icon: (
                  <svg
                    className="w-10 h-10 mx-auto mb-3 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 12h18" />
                    <path d="M12 3v18" />
                  </svg>
                ),
              },
            ].map(({ title, desc, icon }) => (
              <div
                key={title}
                className="bg-bgl1 dark:bg-bgd1 shadow-shadl dark:shadow-shadd border dark:border-bord rounded-xl p-6 shadow-md hover:shadow-lg transition cursor-default"
              >
                {icon}
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* about */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-indigo-900 dark:text-textd mb-6">
          বগুড়া পলিটেকনিক ইনস্টিটিউট লাইব্রেরি সম্পর্কে
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          <strong>বগুড়া পলিটেকনিক ইনস্টিটিউটের ডিজিটাল লাইব্রেরিটি</strong>{" "}
          আমাদের শিক্ষার্থীদের এবং অনুষদদের যেকোনো জায়গায়, যেকোনো সময় মানসম্পন্ন
          শিক্ষাগত সম্পদ অ্যাক্সেস করতে সাহায্য করার জন্য তৈরি করা হয়েছে।{" "}
          <br />
          লাইব্রেরির যেকোনো বই সহজে নেওয়া, ফেরত দেওয়া ইত্যাদি এবং এসব কিছুর তথ্য
          সংরক্ষণ করে রাখার জন্য তৈরী করা হয়েছে।
        </p>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-indigo-900 dark:text-textd mb-12 text-center">
          কিভাবে এটা কাজ করে
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-10">
          {[
            {
              step: "১",
              title: "অ্যাকাউন্ট তৈরি করুন",
              desc: "শিক্ষার্থী বা শিক্ষক হিসেবে কলেজের তথ্য দিয়ে সহজেই রেজিস্ট্রেশন করুন।",
              icon: (
                <svg
                  className="w-12 h-12 mx-auto mb-4 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4z" />
                  <path d="M6 20v-1c0-1.657 3.582-3 6-3s6 1.343 6 3v1" />
                </svg>
              ),
            },
            {
              step: "২",
              title: "বই খুঁজুন ও দেখুন",
              desc: "বিভাগ, বইয়ের নাম বা লেখকের নাম দিয়ে সহজে বই খুঁজে নিন আমাদের স্মার্ট সার্চ ব্যবহার করে।",
              icon: (
                <svg
                  className="w-12 h-12 mx-auto mb-4 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              ),
            },
            {
              step: "৩",
              title: "বই ধার নিন ও পড়ুন",
              desc: "যেকোনো বই সহজে অনুরোধ করুন এবং লাইব্রেরি থেকে সংগ্রহ করুন। ",
              icon: (
                <svg
                  className="w-12 h-12 mx-auto mb-4 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 19l7-7 3 3-7 7-3-3z" />
                  <path d="M18 13l-1-1" />
                  <path d="M12 4v8" />
                </svg>
              ),
            },
          ].map(({ step, title, desc, icon }) => (
            <div
              key={title}
              className="flex-1 bg-bgl1 dark:bg-bgd2 text-textl dark:text-textd border dark:border-bord rounded-xl shadow-md p-8 text-center hover:shadow-lg transition"
            >
              <div className="text-4xl font-bold text-purple-600 mb-4">
                {step}
              </div>
              {icon}
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Departments Preview */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-indigo-900 dark:text-textd mb-12 text-center">
          বিভাগ অনুসারে বইগুলি অন্বেষণ করুন
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {result?.departments?.map(({ name, _id }) => (
            <Link
              key={_id}
              href={`/books/department/${name}`}
              className="block bg-gradient-to-tr from-purple-600 to-indigo-600 text-white rounded-2xl p-8 shadow-lg hover:scale-105 transform transition"
            >
              <h3 className="text-xl font-semibold text-center">{name}</h3>
              <p className="mt-2 text-sm opacity-90">
                {name} এর জন্য পাঠ্যপুস্তক, গবেষণা এবং নোট খুঁজুন.
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
