
import { Figtree } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sitemap from "./components/Sitemap";

const figtree = Figtree({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
        <body className={`${figtree.className} min-h-screen flex flex-col`}>
          <Header />
          <main className="flex-grow w-full">
            {children}
          </main>
          <hr className="max-w-4xl w-full mx-auto text-slate-600 mb-2"/>
          <Sitemap />
          <Footer />

      </body>
    </html>
  );
}
