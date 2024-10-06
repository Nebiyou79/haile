import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

const Home = () => {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center text-white bg-no-repeat bg-cover" style={{ backgroundImage: "url('/hero-background.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 text-center p-6">
          <h1 className="text-6xl font-bold">Helping You Reach Financial Success</h1>
          <p className="mt-4 text-xl max-w-3xl mx-auto">
            Welcome to Finance World, where we work together to provide comprehensive consulting, accounting, and financial services to support your growth.
          </p>
          <Link href="/about">
            <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition">
              Learn More About Us
            </button>
          </Link>
        </div>
      </section>

      {/* About Us Section */}
<section className="py-16 bg-gradient-to-r from-blue-50 to-blue-100">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
    
    {/* Image */}
    <div className="w-full md:w-1/2 p-6">
      <Image 
        src="/about-us.jpg"  // Replace with your actual image path
        alt="About Us"
        width={600}
        height={400}
        className="rounded-lg shadow-lg"
      />
    </div>

    {/* Text Content */}
    <div className="w-full md:w-1/2 p-6 text-center md:text-left">
      <h2 className="text-4xl font-bold">About Our Company</h2>
      <p className="mt-4 text-lg">
        At Finacial World, we are committed to providing personalized financial services that meet the unique needs of each client. Our team is dedicated to excellence in accounting, tax, and consulting services.
      </p>
      <p className="mt-4 text-lg">
        We take time to understand your business’s needs and long-term goals. Our mission is to help you achieve success through strategic planning, consulting, and reliable financial services.
      </p>
    </div>
  </div>
</section>


     {/* Services Section */}
<section className="py-16 bg-gray-100">
  <div className="max-w-7xl mx-auto text-center">
    <h2 className="text-4xl font-bold">Our Services</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
      
      {/* Service 1 */}
      <div className="relative p-6 bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/small-business-accounting.jpg')" }}></div>
        <div className="relative z-10">
          <h3 className="text-3xl font-bold text-white">Small Business Accounting</h3>
          <p className="mt-4 text-lg text-white">We offer tailored accounting services for small businesses to help you manage finances effectively.</p>
          <Link href="/services/small-business-accounting">
            <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition">
              Learn More
            </button>
          </Link>
        </div>
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Service 2 */}
      <div className="relative p-6 bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/tax-service.jpg')" }}></div>
        <div className="relative z-10">
          <h3 className="text-3xl font-bold text-white">Tax Services</h3>
          <p className="mt-4 text-lg text-white">Our tax experts ensure that your tax liabilities are minimized while staying compliant with the law.</p>
          <Link href="/services/tax-service">
            <button className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition">
              Learn More
            </button>
          </Link>
        </div>
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Service 3 */}
      <div className="relative p-6 bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/financial-consulting.jpg')" }}></div>
        <div className="relative z-10">
          <h3 className="text-3xl font-bold text-white">Financial Consulting</h3>
          <p className="mt-4 text-lg text-white">Our consultants help you strategize and achieve long-term financial success for your business.</p>
          <Link href="/services/financial-consulting">
            <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition">
              Learn More
            </button>
          </Link>
        </div>
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

    </div>
  </div>
</section>

{/* Contact Section */}
<section className="py-16 bg-blue-50">
  <div className="max-w-7xl mx-auto text-center">
    <h2 className="text-4xl font-bold">Get in Touch</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
      
      {/* Email Card */}
      <div className="p-6 bg-blue-600 text-white rounded-lg shadow-md flex flex-col items-center">
        <FaEnvelope size={50} />
        <h3 className="text-2xl font-semibold mt-4">Email Us</h3>
        <a href="mailto:haile@fwl-cpa.com" className="mt-2 text-lg underline hover:text-gray-200 transition">
          haile@fwl-cpa.com
        </a>
      </div>

      {/* Phone Card */}
      <div className="p-6 bg-blue-600 text-white rounded-lg shadow-md flex flex-col items-center">
        <FaPhone size={50} />
        <h3 className="text-2xl font-semibold mt-4">Call Us</h3>
        <p className="mt-2 text-lg">804-610-3825</p>
        <p className="mt-1 text-lg">702-815-9685</p>
      </div>

      {/* Location Card */}
      <div className="p-6 bg-blue-600 text-white rounded-lg shadow-md flex flex-col items-center">
        <FaMapMarkerAlt size={50} />
        <h3 className="text-2xl font-semibold mt-4">Visit Us</h3>
        <a href="https://www.google.com/maps/place/6802+Paragon+Place,+Suite+410,+Richmond,+VA+23230" 
           target="_blank" 
           rel="noopener noreferrer" 
           className="mt-2 text-lg underline hover:text-gray-200 transition">
          6802 Paragon Place, Suite 410, Richmond, VA 23230
        </a>
      </div>

    </div>
  </div>
</section>
      <Footer />
    </>
  );
};

export default Home;
