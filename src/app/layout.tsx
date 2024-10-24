import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./Navabar";

export const metadata: Metadata = {
  title: "SalesTracker",
  description: "Salesman tracking app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
