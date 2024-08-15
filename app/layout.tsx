
import { Figtree } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

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
          <main className="flex-grow">
            {children}
          </main>
        <Footer />

      </body>
    </html>
  );
}
