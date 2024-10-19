import React from 'react';
import Footer from '../components/Footer';
import Navbar from '@/components/Navbar';
// import ContactForm from '@/components/Contactform';

const Contact = () => {
  return (
    <div className="min-h-screen">
       <Navbar />
      {/* Gradient Background */}
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto p-6 py-12">
          <h1 className="text-4xl font-bold text-center mb-12">Contact Us</h1>

          {/* Contact Information Section */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white text-gray-800 shadow-lg rounded-xl p-8 text-center">
              <h3 className="text-2xl font-semibold mt-4">Phone</h3>
              <p className="mt-4 text-lg">804-610-3825 | 702-815-9685</p>
            </div>
            <div className="bg-white text-gray-800 shadow-lg rounded-xl p-8 text-center">
              <h3 className="text-2xl font-semibold mt-4">Email</h3>
              <a href="mailto:haile@fwl-cpa.com" className="mt-2 text-lg underline hover:text-gray-200 transition">
          haile@fwl-cpa.com
        </a>
            </div>
            <div className="bg-white text-gray-800 shadow-lg rounded-xl p-8 text-center">
              <h3 className="text-2xl font-semibold mt-4">Location</h3>
              <p className="mt-4 text-lg">6802 Paragon Place, Suite 410, Richmond, VA 23230</p>
            </div>
          </section>
          {/* <ContactForm/> */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
