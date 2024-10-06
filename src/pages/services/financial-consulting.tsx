import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

const FinancialConsulting = () => {
  return (
    <div className="relative min-h-screen bg-gray-100">
        <Navbar/>
      <div className="relative container mx-auto p-8 z-10">
        <h1 className="text-3xl font-bold mb-4">Financial Consulting</h1>
        <p className="mb-6">
          Our financial consulting services are designed to guide businesses through complex financial landscapes, ensuring you make informed decisions that promote growth and stability. 
          We work closely with you to tailor our strategies to your unique needs and objectives.
        </p>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">Business Planning</h2>
            <p>We help businesses develop comprehensive business plans that outline their strategies for success, including market analysis and financial projections.</p>
            <p className="mt-2">Our experts guide you through the planning process, ensuring you are prepared to meet your business goals and attract investors.</p>
          </div>

          {/* Card 2 */}
          <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">Risk Management</h2>
            <p>Our risk management services identify potential financial risks and develop strategies to mitigate them, safeguarding your business financial health.</p>
            <p className="mt-2">We assess your financial exposure and create action plans to minimize the impact of unforeseen events on your operations.</p>
          </div>

          {/* Card 3 */}
          <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">Investment Strategies</h2>
            <p>We provide tailored investment strategies designed to help you grow your wealth and meet your financial goals.</p>
            <p className="mt-2">Our team analyzes market trends and opportunities, ensuring your investments align with your overall financial objectives.</p>
          </div>

          {/* Card 4 */}
          <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">Performance Improvement</h2>
            <p>We analyze your financial performance and identify areas for improvement, helping you enhance profitability and efficiency.</p>
            <p className="mt-2">Our approach combines quantitative analysis with qualitative insights to drive impactful changes in your business operations.</p>
          </div>

          {/* Card 5 */}
          <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">Financial Reporting</h2>
            <p>We provide detailed financial reporting services that keep you informed about your business performance and financial position.</p>
            <p className="mt-2">Our reports are designed to be clear and actionable, allowing you to make strategic decisions with confidence.</p>
          </div>

          {/* Card 6 */}
          <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">Cost Analysis</h2>
            <p>We perform thorough cost analysis to help you understand your expenses and identify opportunities for savings.</p>
            <p className="mt-2">Our insights enable you to make informed decisions that positively impact your bottom line and overall financial health.</p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default FinancialConsulting;
