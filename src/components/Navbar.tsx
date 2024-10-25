import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // Toggle services dropdown
  const toggleServicesDropdown = () => {
    setServicesDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white sticky border-blue-800 text-black py-4 top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Image src="/logo.png" alt="Company Logo" width={90} height={90} />
          <div>
            <h1 className="text-2xl font-bold">Finance World</h1>
            <div className="md:flex items-center space-x-2">
              <Image src="/capture-.png" alt="Haile & Associates, PC" width={250} height={90} />
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-black focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
              />
            </svg>
          </button>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex md:space-x-6">
          <li>
            <button className="text-black font-semibold py-2 px-4 rounded hover:bg-blue-700 transition-all duration-300">
              <Link href="/">
                Home
              </Link>
            </button>
          </li>
          <li>
            <button className="text-black font-semibold py-2 px-4 rounded hover:bg-blue-700 transition-all duration-300">
              <Link href="/about">
                About
              </Link>
            </button>
          </li>

          {/* Services Dropdown */}
          <li className="relative">
            <button
              onClick={toggleServicesDropdown}
              className="text-black font-semibold py-2 px-4 rounded hover:bg-blue-700 transition-all duration-300"
            >
              Services
            </button>
            {servicesDropdownOpen && (
              <ul className="absolute left-0 top-full mt-2 w-48 bg-blue-600 rounded-lg shadow-lg z-50">
                <li>
                  <Link
                    href="/services/small-business-accounting"
                    className="block px-4 py-2 text-white hover:bg-blue-700 rounded transition-all duration-300"
                    onClick={() => setServicesDropdownOpen(false)}
                  >
                    Small Business Accounting
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/tax-service"
                    className="block px-4 py-2 text-white hover:bg-blue-700 rounded transition-all duration-300"
                    onClick={() => setServicesDropdownOpen(false)}
                  >
                    Tax Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/financial-consulting"
                    className="block px-4 py-2 text-white hover:bg-blue-700 rounded transition-all duration-300"
                    onClick={() => setServicesDropdownOpen(false)}
                  >
                    Financial Consulting
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <button className="text-black font-semibold py-2 px-4 rounded hover:bg-blue-700 transition-all duration-300">
              <Link href="/resources">
                Resources
              </Link>
            </button>
          </li>
          <li>
            <button className="text-black font-semibold py-2 px-4 rounded hover:bg-blue-700 transition-all duration-300">
              <Link href="/contact">
                Contact
              </Link>
            </button>
          </li>
        </ul>
      </div>

      {/* Mobile Menu Links */}
      {menuOpen && (
        <div className="md:hidden mt-4">
          <div className="space-y-2">
            <Link href="/" className="block text-black font-semibold py-4 px-6 bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-md text-center">
              Home
            </Link>
            <Link href="/about" className="block text-black font-semibold py-4 px-6 bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-md text-center">
              About
            </Link>

            {/* Mobile Dropdown for Services */}
            <div className="text-center" ref={dropdownRef}>
              <button
                onClick={toggleServicesDropdown}
                className="w-full text-black font-semibold py-4 px-6 bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-md"
              >
                Services
              </button>
              {servicesDropdownOpen && (
                <div className="space-y-2 mt-2">
                  <Link href="/services/small-business-accounting" className="block text-black font-semibold py-2 px-6 bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-md text-center" onClick={(e) => { e.stopPropagation(); setServicesDropdownOpen(false); }}>
                    Small Business Accounting
                  </Link>
                  <Link href="/services/tax-service" className="block text-black font-semibold py-2 px-6 bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-md text-center" onClick={(e) => { e.stopPropagation(); setServicesDropdownOpen(false); }}>
                    Tax Service
                  </Link>
                  <Link href="/services/financial-consulting" className="block text-black font-semibold py-2 px-6 bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-md text-center" onClick={(e) => { e.stopPropagation(); setServicesDropdownOpen(false); }}>
                    Financial Consulting
                  </Link>
                </div>
              )}
            </div>

            <Link href="/resources" className="block text-black font-semibold py-4 px-6 bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-md text-center">
              Resources
            </Link>
            <Link href="/contact" className="block text-black font-semibold py-4 px-6 bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-md text-center">
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
