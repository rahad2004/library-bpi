import AuthRedirect from "@/components/AuthRedirect";

export const metadata = {
  title: "Authentication For BPI Library",
  description: "Register and Login to BPI library.",
};

export default function RootLayout({ children }) {
  return (
    <>
      <AuthRedirect />
      {children}
    </>
  );
}
