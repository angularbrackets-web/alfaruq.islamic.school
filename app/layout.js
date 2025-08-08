import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./Navbar"; // Import Navbar
import Footer from "./Footer"; // We will create this component

export const metadata = {
  title: "Al Faruq Islamic School - Empowering the Future with Faith and Knowledge",
  description: "Accredited Islamic Education from Kindergarten to Grade 9. Building strong foundations in faith, character, and academic excellence.",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="icon" type="image/png" href="/images/AFIS.Logo1.png" />
      </head>
      <body className={`${inter.variable} font-sans text-gray-800 flex flex-col min-h-screen`}>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
