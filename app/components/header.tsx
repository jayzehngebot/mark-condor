'use client'

import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-slate-100 h-10">
      <nav className="flex items-center justify-between h-10 p-3 mt-0">
        <h1 className="ml-2 sm:ml-4 md:ml-10">
          <a href="/">Condor Method</a>
        </h1>
        <div className="relative md:hidden">
          <button 
            id="dropdownDefaultButton" 
            data-dropdown-toggle="dropdown" 
            className="text-white w-full bg-blue-700 ml-50 mr-5 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm pl-6 py-0 text-center inline-flex items-center" 
            type="button"
            onClick={toggleDropdown}
          >
            Offerings 
            <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
            </svg>
          </button>
          {isOpen && (
            <div id="dropdown" className="z-50 absolute right-0 top-full w-full bg-slate-100 rounded-b divide-y bg-color-grey divide-gray-100 shadow bg-gray-700">
              <ul className="py-2 text-md text-gray-200 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                <li>
                  <a href="/shop" className="block px-6 py-2 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-white">Shop</a>
                </li>
                <li>
                  <a href="/projects" className="block px-6 py-2 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-white">Projects</a>
                </li>
                <li>
                  <a href="/testimony" className="block px-6 py-2 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-white">Testimony</a>
                </li>
                <li>
                  <a href="/hire" className="block px-6 py-2 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-white">You x MC</a>
                </li>
                <li>
                  <a href="/thoughts" className="block px-6 py-2 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-white">Thoughts</a>
                </li>
                <li>
                  <a href="/about" className="block px-6 py-2 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-white">About</a>
                </li>
              </ul>
            </div>
          )}
        </div>
        <ul className="hidden md:flex space-x-4">
          <li>
            <a href="/shop" className="hover:text-blue-700">Shop</a>
          </li>
          <li>
            <a href="/projects" className="hover:text-blue-700">Projects</a>
          </li>
          <li>
            <a href="/testimony" className="hover:text-blue-700">Testimony</a>
          </li>
          <li>
            <a href="/hire" className="hover:text-blue-700">You x MC</a>
          </li>
          <li>
            <a href="/thoughts" className="hover:text-blue-700">Thoughts</a>
          </li>
          <li>
            <a href="/about" className="hover:text-blue-700">About</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}