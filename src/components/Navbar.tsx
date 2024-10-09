import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLUListElement | null>(null);

  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState);
  };

  const toggleMenu = () => {
    setMenuOpen(prevState => !prevState);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-blue-400 text-black py-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center space-x-4">
          <Image src="/logo.png" alt="Company Logo" width={50} height={50} />
          <div>
            <h1 className="text-2xl font-bold">Finance World</h1>
            <div className="flex items-center space-x-2">
              <Image src="/Capture.PNG" alt="Haile & Associates, PC" width={200} height={50} />
            </div>
          </div>
        </div>

        {/* Hamburger icon for mobile */}
        <button
          className="md:hidden p-2 focus:outline-none"
          onClick={toggleMenu}
        >
          <span className="text-white">☰</span>
        </button>

        {/* Links Section */}
        <div className={`absolute md:static inset-0 md:flex md:items-center md:space-x-6 transition-all duration-300 ease-in-out ${menuOpen ? 'flex' : 'hidden md:flex'} bg-blue-400 md:bg-transparent`}>
          <Link href="/" className="hover:bg-orange-600 py-2 px-4 rounded transition">Home</Link>
          <Link href="/about" className="hover:bg-orange-600 py-2 px-4 rounded transition">About</Link>

          {/* Services Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="hover:bg-orange-600 py-2 px-4 rounded transition"
            >
              Services
            </button>
            {dropdownOpen && (
              <ul ref={dropdownRef} className="absolute left-0 mt-2 w-48 bg-gray-700 rounded-lg shadow-lg z-10">
                <li>
                  <Link href="/services/small-business-accounting" className="block px-4 py-2 hover:bg-orange-600" onClick={() => setDropdownOpen(false)}>Small Business Accounting</Link>
                </li>
                <li>
                  <Link href="/services/tax-service" className="block px-4 py-2 hover:bg-orange-600" onClick={() => setDropdownOpen(false)}>Tax Service</Link>
                </li>
                <li>
                  <Link href="/services/financial-consulting" className="block px-4 py-2 hover:bg-orange-600" onClick={() => setDropdownOpen(false)}>Financial Consulting</Link>
                </li>
              </ul>
            )}
          </div>

          <Link href="/resources" className="hover:bg-orange-600 py-2 px-4 rounded transition">Resources</Link>
          <Link href="/contact" className="hover:bg-orange-600 py-2 px-4 rounded transition">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
