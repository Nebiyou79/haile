import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaLinkedinIn, FaTelegramPlane } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-blue-400 text-black py-4 bottom-0 z-50 shadow-md">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1 - Logo and Social Icons */}
        <div className="flex flex-col items-center space-y-4">
          <Image src="/logo.png" alt="Company Logo" width={100} height={100} />
          <h2 className="text-xl font-bold">Haile & Associates, PC</h2>
          <div className="flex space-x-4">
            <Link href="/" className="hover:bg-orange-600 py-2 px-4 rounded transition"><FaFacebookF size={24} /></Link>
            <Link href="/" className="hover:bg-orange-600 py-2 px-4 rounded transition"><FaLinkedinIn size={24} /></Link>
            <Link href="/" className="hover:bg-orange-600 py-2 px-4 rounded transition"><FaTelegramPlane size={24} /></Link>
          </div>
        </div>

        {/* Column 2 - Links */}
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-center">
            <li><Link href="/" className="hover:bg-orange-600 py-2 px-4 rounded transition">Home</Link></li>
            <li><Link href="/about" className="hover:bg-orange-600 py-2 px-4 rounded transition">About</Link></li>
            <li><Link href="/services" className="hover:bg-orange-600 py-2 px-4 rounded transition">Services</Link></li>
            <li><Link href="/contact" className="hover:bg-orange-600 py-2 px-4 rounded transition">Contact</Link></li>
          </ul>
        </div>

        {/* Column 3 - Contact Info */}
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-bold mb-4">Contact Us</h3>
          <p>804-610-3825 | 702-815-9685</p>
          <p>
            <a href="mailto:haile@fwl-cpa.com" className="underline hover:text-gray-400">
              haile@fwl-cpa.com
            </a>
          </p>
          <p>
            <a href="https://www.google.com/maps/place/6802+Paragon+Place,+Suite+410,+Richmond,+VA+23230"
              target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-400">
              6802 Paragon Place, Suite 410, Richmond, VA 23230
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
