'use client';

import { Figtree } from "next/font/google";
import "./globals.css";
import Header from "./components/Nuheader";
import Alert from "./components/Nualert";
import Footer from "./components/Footer";
import { useState, useEffect } from 'react';

const figtree = Figtree({ subsets: ["latin"] });

async function getAlerts() {
  try {
    const response = await fetch('/api/getAlerts', { cache: "no-cache" });
    
    if (!response.ok) {
      throw new Error("Failed to fetch alert data");
    }
    
    console.log(response.json);
    return await response.json();
  } catch (error) {
    console.error("Error fetching alert text:", error);
    throw error;
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [alertData, setAlertData] = useState(null);

  useEffect(() => {
      getAlerts()
          .then(data => setAlertData(data))
          .catch(error => console.error("Error setting alert data:", error));
  }, []);

  return (
    <html lang="en">
        <body className={`${figtree.className} min-h-screen flex flex-col`}>
  
        {alertData && alertData[0] === "TRUE" && <Alert alertText={alertData[1]} />}

        <Header />
        {children}
        <Footer />

      </body>
    </html>
  );
}
