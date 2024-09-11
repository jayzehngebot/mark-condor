'use client'

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import styles from './Header.module.css'; // Import the CSS module
import Alert from './Alert'; // Import the default export
// import Search from './Search'; // Correct the import path

let cachedAlertData: [string, string] | null = null;

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  async function getAlerts() {
    if (cachedAlertData) {
      return cachedAlertData;
    }

    try {
      const response = await fetch('/api/getAlerts', { cache: "no-cache" });
      
      if (!response.ok) {
        throw new Error("Failed to fetch alert data");
      }
      
      const data = await response.json();
      cachedAlertData = data; // Cache the data
      return data;
    } catch (error) {
      console.error("Error fetching alert text:", error);
      throw error;
    }
  }

  const [alertData, setAlertData] = useState(null);

  useEffect(() => {
      getAlerts()
          .then(data => setAlertData(data))
          .catch(error => console.error("Error setting alert data:", error));
  }, []);

  const pathname = usePathname()
  const isActive = (path: string) => pathname === path;

  return (
    <header className={`bg-slate-100 ${alertData && alertData[0] === "TRUE" ? 'h-22' : 'h-12'}`}> 
      
      {alertData && alertData[0] === "TRUE" && <Alert alertText={alertData[1]} showAlert={true} />}
      
      <nav className="flex items-center justify-between h-12 mt-0 text-slate-400">
        <div className="flex items-center">
          <h1 className="mt-0 ml-4 sm:ml-4 md:ml-10">
            <Link href="/">Mark Condor</Link>
          </h1>
        </div>
        <div className="relative md:hidden pr-1">
          <button 
            id="dropdownDefaultButton" 
            data-dropdown-toggle="dropdown" 
            className="pl-7 pr-3 sm:pr-5 py-0 text-white w-full bg-blue-700 ml-50 hover:bg-blue-800 focus:outline-none rounded-lg text-center inline-flex items-center" 
            type="button"
            onClick={toggleDropdown}
          >
              Offerings
            <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
            </svg>
          </button>
          <div id="dropdown" className={`${isOpen ? styles.dropdownOpen : styles.dropdownClosed} z-50 absolute right-[-12px] w-full bg-slate-100 rounded-b divide-y bg-color-grey divide-gray-100 shadow bg-gray-700`}>
            <ul className="py-2 text-md text-gray-200 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
              <li>
                <Link href="/shop" className="block px-[10px] py-2 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleLinkClick}>Shop</Link>
              </li>
              <li>
                <Link href="/projects" className="block px-[10px] py-2 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleLinkClick}>Projects</Link>
              </li>
              <li>
                <Link href="/testimony" className="block px-[10px] py-2 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleLinkClick}>Testimony</Link>
              </li>
              <li>
                <Link href="/hire" className="block px-[10px] py-2 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleLinkClick}>Hire M.C.</Link>
              </li>
              <li>
                <Link href="/thoughts" className="block px-[10px] py-2 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleLinkClick}>Thoughts</Link>
              </li>
              <li>
                <Link href="/sources" className="block px-[10px] py-2 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleLinkClick}>Sources</Link>
              </li>
              <li>
                <Link href="/about" className="block px-[10px] py-2 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleLinkClick}>About</Link>
              </li>
              <li>
                <Link href="/squad" className="block px-[10px] py-2 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleLinkClick}>Squad</Link>
              </li>
            </ul>
          </div>
        </div>
        <ul id="desktop-nav" className="hidden md:flex space-x-4 mt-0 mr-5">
          <li>
            <Link href="/shop" className={`hover:text-blue-700 ${isActive('/shop') ? 'underline' : ''}`}>Shop</Link>
          </li>
          <li>
            <Link href="/projects" className={`hover:text-blue-700 ${isActive('/projects') ? 'underline' : ''}`}>Projects</Link>
          </li>
          <li>
            <Link href="/testimony" className={`hover:text-blue-700 ${isActive('/testimony') ? 'underline' : ''}`}>Testimony</Link>
          </li>
          <li>
            <Link href="/hire" className={`hover:text-blue-700 ${isActive('/hire') ? 'underline' : ''}`}>Hire M.C.</Link>
          </li>
          <li>
            <Link href="/thoughts" className={`hover:text-blue-700 ${isActive('/thoughts') ? 'underline' : ''}`}>Thoughts</Link>
          </li>
          <li>
            <Link href="/sources" className={`hover:text-blue-700 ${isActive('/sources') ? 'underline' : ''}`}>Sources</Link>
          </li>
          <li>
            <Link href="/about" className={`hover:text-blue-700 ${isActive('/about') ? 'underline' : ''}`}>About</Link>
          </li>
          <li>
            <Link href="/squad" className={`hover:text-blue-700 ${isActive('/squad') ? 'underline' : ''}`}>Squad</Link>
          </li>
          {/* <li>
            <div className="ml-4 pr-1">
              <Search input="yourInputValue" />
            </div>
          </li> */}
        </ul>
      </nav>
    </header>
  );
}