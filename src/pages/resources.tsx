import React from 'react';
import Footer from '../components/Footer';
import Navbar from '@/components/Navbar';
import Image from 'next/image';

const Resources = () => {
  // Define the resources for each section
  const taxResources = [
    { title: "IRS Website", url: "https://www.irs.gov" },
    { title: "Tax Forms", url: "https://www.irs.gov/forms-pubs" },
    { title: "State Tax Departments", url: "https://www.taxadmin.org/state-tax-agencies" },
  ];

  const accountingTools = [
    { title: "QuickBooks", url: "https://quickbooks.intuit.com" },
    { title: "Xero Accounting", url: "https://www.xero.com/us/" },
    { title: "FreshBooks", url: "https://www.freshbooks.com" },
  ];

  const financialInsights = [
    { title: "Financial Trends & Insights", url: "https://www.deloitte.com/insights" },
    { title: "Small Business Administration", url: "https://www.sba.gov" },
    { title: "CPA Practice Advisor", url: "https://www.cpapracticeadvisor.com" },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto p-6 py-12">
        <h1 className="text-4xl font-bold text-center mb-12">Resources</h1>

        {/* Tax Resources Section */}
        <section className="mb-16 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <Image src="/tax-resources.jpg" alt="Tax Resources" width={600} height={400} className="rounded-md shadow-md"/>
          </div> 
          <div className="md:w-1/2 pl-0 md:pl-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tax Resources</h2>
            <p className="text-gray-600 mb-6">
              Stay up-to-date with the latest tax regulations, forms, and state-specific requirements by visiting our trusted tax resource websites.
            </p>
            <ul className="space-y-3">
              {taxResources.map((resource, index) => (
                <li key={index} className="bg-white shadow-md p-4 rounded-md">
                  <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {resource.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Accounting Tools Section */}
        <section className="mb-16 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:order-2 mb-8 md:mb-0">
            <Image src="/accounting-tools.jpg" alt="Accounting Tools" width={600} height={400} className="rounded-md shadow-md"/>
          </div>
          <div className="md:w-1/2 pr-0 md:pr-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Accounting Tools</h2>
            <p className="text-gray-600 mb-6">
              Discover essential accounting tools that streamline your bookkeeping and financial management. These tools help keep your business finances organized and compliant.
            </p>
            <ul className="space-y-3">
              {accountingTools.map((tool, index) => (
                <li key={index} className="bg-white shadow-md p-4 rounded-md">
                  <a href={tool.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {tool.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Financial Insights Section */}
        <section className="mb-16 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <Image src="/financial-insights.jpg" alt="Financial Insights" width={600} height={400} className="rounded-md shadow-md"/>
          </div>
          <div className="md:w-1/2 pl-0 md:pl-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Financial Insights</h2>
            <p className="text-gray-600 mb-6">
              Explore the latest financial trends, insights, and strategies to help grow and optimize your business. Stay informed with expert insights and analysis.
            </p>
            <ul className="space-y-3">
              {financialInsights.map((insight, index) => (
                <li key={index} className="bg-white shadow-md p-4 rounded-md">
                  <a href={insight.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {insight.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Resources;
