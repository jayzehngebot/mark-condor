'use client'

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import styles from './Header.module.css'; // Import the CSS module
import Alert from './Alert'; // Import the default export

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


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
      
      <nav className="flex items-center justify-between h-12 p-3 mt-0 text-slate-400">
        <h1 className="mt-1 ml-2 sm:ml-4 md:ml-10">
          <Link href="/">Mark Condor</Link>
        </h1>
        <div className="relative md:hidden">
          <button 
            id="dropdownDefaultButton" 
            data-dropdown-toggle="dropdown" 
            className="text-white w-full bg-blue-700 ml-50 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm pl-6 py-0 text-center inline-flex items-center" 
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
                <Link href="/shop" className="block px-[10px] py-2 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-white">Shop</Link>
              </li>
              <li>
                <Link href="/projects" className="block px-[10px] py-2 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-white">Projects</Link>
              </li>
              <li>
                <Link href="/testimony" className="block px-[10px] py-2 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-white">Testimony</Link>
              </li>
              <li>
                <Link href="/hire" className="block px-[10px] py-2 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-white">You x M.C.</Link>
              </li>
              <li>
                <Link href="/thoughts" className="block px-[10px] py-2 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-white">Thoughts</Link>
              </li>
              <li>
                <Link href="/sources" className="block px-[10px] py-2 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-white">Sources</Link>
              </li>
              <li>
                <Link href="/about" className="block px-[10px] py-2 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-white">About</Link>
              </li>
              <li>
                <Link href="/deepcuts" className="block px-[10px] py-2 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-white">Deep Cuts</Link>
              </li>
            </ul>
          </div>
        </div>
        <ul className="hidden md:flex space-x-4 mt-1 mr-2">
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
            <Link href="/hire" className={`hover:text-blue-700 ${isActive('/hire') ? 'underline' : ''}`}>You x MC</Link>
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
            <Link href="/deepcuts" className={`hover:text-blue-700 ${isActive('/deepcuts') ? 'underline' : ''}`}>Deep Cuts</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}