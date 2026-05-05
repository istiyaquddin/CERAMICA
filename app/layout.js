import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata = {
  title: "CERAMICA | Architectural Surfaces & Premium Tiles",
  description: "Curating the finest architectural surfaces for modern environments. Explore our gallery of premium porcelain, stone, and artisan tiles.",
  keywords: "tiles, porcelain, marble, architecture, interior design, premium surfaces",
};

/**
 * Root Layout
 * 
 * Provides the core structure for every page in the application.
 * Includes global fonts, metadata, Navbar, and Footer.
 */
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="ceramicaDark" className={`${inter.variable} ${manrope.variable} dark`}>
      <head>
        {/* Material Symbols Outlined */}
        <link 
          rel="stylesheet" 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" 
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
      </head>
      <body className="antialiased selection:bg-stone-200 dark:selection:bg-stone-800">
        <AuthProvider>
          <Toaster position="top-center" />
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
