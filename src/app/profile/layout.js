import ProfileRedirect from "@/components/ProfileRedirect";

export const metadata = {
  title: "LMS | Profile",
};

export default function RootLayout({ children }) {
  return (
    <>
      <ProfileRedirect />
      {children}
    </>
  );
}
