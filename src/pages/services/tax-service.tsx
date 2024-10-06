import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

const TaxServices = () => {
  return (
    <div className="relative min-h-screen bg-gray-100">
        <Navbar/>
      <div className="relative container mx-auto p-8 z-10">
        <h1 className="text-3xl font-bold mb-4">Tax Services</h1>
        <p className="mb-6">
          Our tax services ensure that you remain compliant with all tax regulations while minimizing your tax liabilities. 
          We provide expert advice and strategies to help you navigate complex tax laws effectively.
        </p>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">Tax Preparation</h2>
            <p>We offer comprehensive tax preparation services for individuals and businesses to ensure timely and accurate filings.</p>
            <p className="mt-2">Our experts will work with you to gather the necessary documents and maximize your deductions, resulting in the best possible outcomes for your tax return.</p>
          </div>

          {/* Card 2 */}
          <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">Tax Planning Strategies</h2>
            <p>Our tax planning strategies help you minimize tax liabilities while maximizing your financial benefits.</p>
            <p className="mt-2">By proactively managing your tax situation throughout the year, we help you avoid last-minute surprises during tax season.</p>
          </div>

          {/* Card 3 */}
          <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">Audit Representation</h2>
            <p>We represent you during tax audits, ensuring that your rights are protected and your interests are upheld.</p>
            <p className="mt-2">Our experienced team will handle all communications with tax authorities and provide the necessary documentation to resolve any issues.</p>
          </div>

          {/* Card 4 */}
          <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">Estate and Trust Tax Services</h2>
            <p>We provide specialized tax services for estates and trusts, helping you navigate the complexities of estate taxation.</p>
            <p className="mt-2">Our team ensures compliance with tax laws while minimizing tax burdens for beneficiaries, providing peace of mind during sensitive transitions.</p>
          </div>

          {/* Card 5 */}
          <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">International Tax Services</h2>
            <p>Our international tax services help businesses and individuals comply with tax laws across different countries.</p>
            <p className="mt-2">We provide guidance on tax treaties and help you navigate the intricacies of global taxation for your business or personal finances.</p>
          </div>

          {/* Card 6 */}
          <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">Sales Tax Compliance</h2>
            <p>We help businesses understand and comply with sales tax regulations, ensuring proper collection and remittance.</p>
            <p className="mt-2">Our services include sales tax audits and advising on best practices to avoid penalties and ensure compliance.</p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default TaxServices;
