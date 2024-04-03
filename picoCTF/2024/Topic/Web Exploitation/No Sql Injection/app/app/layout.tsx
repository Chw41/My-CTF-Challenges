import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "Non-SQL injection",
  description: "Non-SQL injection challenge for picoCTF",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#eaeaed]">
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
