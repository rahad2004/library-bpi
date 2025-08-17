import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FaFacebookF, FaLinkedinIn, FaGithub } from "react-icons/fa";

import { StoreProvider } from "@/store/StoreProvider.jsx";
import Toast from "@/components/Toast";
import Authentication from "@/components/Authentication";
import Loading from "@/components/Loading";
import Link from "next/link";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Library Management System, Bogura Polytechnic Institute",
  description:
    "A digital library management system for Bogura Polytechnic Institute, providing easy access to library resources and services.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <StoreProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider attribute="class" enableSystem defaultTheme="system">
            <Loading />
            <Toast />
            <Authentication />
            <main className="min-h-screen bg-bgl1 text-textl dark:bg-bgd1 dark:textd flex flex-col justify-center">
              {children}
            </main>
            <footer className="bg-bgl1 dark:bg-bgd2 border-t dark:border-bord text-textl dark:text-textd shadow px-6 py-10 text-sm">
              <div className="max-w-7xl mx-auto grid gap-6 md:grid-cols-3 text-center">
                {/* Institute Info */}
                <div>
                  <h3 className="text-base font-semibold text-purple-500 mb-2">
                    About
                  </h3>
                  <p>
                    © {new Date().getFullYear()} Bogura Polytechnic Institute
                    Digital Library.
                  </p>
                  <p>All rights reserved.</p>
                </div>

                {/* Contact Info */}
                <div>
                  <h3 className="text-base font-semibold text-purple-500 mb-2">
                    Contact
                  </h3>
                  <p>Managed by: Library Committee, BPI</p>
                  <p>
                    Email:{" "}
                    <Link
                      href="mailto:bogra_poly@yahoo.com"
                      className="hover:underline text-purple-300"
                    >
                      bogra_poly@yahoo.com
                    </Link>
                  </p>
                </div>

                {/* Developer Info */}
                <div>
                  <h3 className="text-base font-semibold text-purple-500 mb-2">
                    Developers
                  </h3>
                  <p>
                    Crafted with ❤️ by{" "}
                    <Link
                      href="/developers"
                      className="text-purple-500 hover:underline"
                    >
                      CST Department
                    </Link>
                  </p>
                  <div className="flex justify-center gap-4 mt-3 text-lg">
                    <Link
                      href="https://www.facebook.com/md.abdus.sabur.sayam"
                      target="_blank"
                      className="hover:text-purple-400 transition"
                    >
                      <FaFacebookF />
                    </Link>
                    <Link
                      href="https://www.linkedin.com/in/md-abdus-sabur-engineer/"
                      target="_blank"
                      className="hover:text-purple-400 transition"
                    >
                      <FaLinkedinIn />
                    </Link>
                    <Link
                      href="https://github.com/absabur"
                      target="_blank"
                      className="hover:text-purple-400 transition"
                    >
                      <FaGithub />
                    </Link>
                  </div>
                </div>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </StoreProvider>
    </html>
  );
}
