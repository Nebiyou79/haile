import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function BookingSuccess() {
  const router = useRouter();

  useEffect(() => {
    // Clear any booking data from localStorage if needed
    const timer = setTimeout(() => {
      // Redirect to home after 10 seconds
      // router.push('/');
    }, 10000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
    <Navbar/>
      <Head>
        <title>Booking Confirmed - FWL-CPA</title>
        <meta name="description" content="Your appointment with FWL-CPA has been confirmed successfully." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-blue-600 py-6 px-8 text-center">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white">Appointment Confirmed!</h1>
          </div>
          
          <div className="p-8">
            <p className="text-lg text-gray-600 mb-6 text-center">
              Thank you for scheduling with FWL-CPA. We`ve sent a confirmation email with all the details.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                What`s Next?
              </h3>
              <ul className="text-sm text-blue-800 space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Check your email for confirmation details
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Add the appointment to your calendar
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  We`ll send a reminder 24 hours before your appointment
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  For virtual meetings, the link will be sent 1 hour prior
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <Link href="/" legacyBehavior>
                <a className="block w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center font-medium">
                  Return to Homepage
                </a>
              </Link>
              
              <Link href="/book" legacyBehavior>
                <a className="block w-full border border-blue-600 text-blue-600 py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors text-center font-medium">
                  Book Another Appointment
                </a>
              </Link>
            </div>

            <p className="text-sm text-gray-500 mt-6 text-center">
              Need to make changes? Contact us at{' '}
              <a href="mailto:haile@fwl-cpa.com" className="text-blue-600 hover:underline font-medium">
                haile@fwl-cpa.com
              </a>
            </p>
          </div>
          
          <div className="bg-gray-100 py-4 px-6 text-center">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} FWL-CPA. All rights reserved.
            </p>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}