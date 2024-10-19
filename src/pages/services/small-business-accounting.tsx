import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

const SmallBusinessAccounting = () => {
  return (
    <div className="relative min-h-screen bg-gray-100">
        <Navbar/>
      <div className="relative container mx-auto p-8 z-10">
        <h1 className="text-3xl font-bold mb-4">Small Business Accounting</h1>
        <p className="mb-6">
          At Finance World, we specialize in providing comprehensive accounting services tailored for small businesses. 
          Our team ensures that your financial records are accurate, up-to-date, and compliant with local regulations. 
          We take pride in helping you make informed decisions through detailed financial reports and insights.
        </p>
        
        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">Bookkeeping</h2>
            <p>We provide accurate and timely bookkeeping services to help you keep track of your finances. Our experts ensure all your transactions are recorded properly.</p>
            <p className="mt-2">With our bookkeeping service, you can focus on running your business while we manage your financial records. Our team uses advanced software to ensure accuracy and efficiency.</p>
          </div>
          
          {/* Card 2 */}
          <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">Financial Statement Preparation</h2>
            <p>We prepare detailed financial statements that give you a clear picture of your business financial health, ensuring compliance with relevant regulations.</p>
            <p className="mt-2">These statements are essential for evaluating your business performance and for making informed decisions regarding investments and budgeting.</p>
          </div>

          {/* Card 3 */}
          <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">Payroll Management</h2>
            <p>Our payroll management services ensure that your employees are paid accurately and on time, while also handling tax withholdings and reporting.</p>
            <p className="mt-2">We streamline your payroll processes to minimize errors and provide you with peace of mind knowing that your staff are compensated correctly.</p>
          </div>

          {/* Card 4 */}
          <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">Tax Compliance and Planning</h2>
            <p>We help you navigate tax regulations and ensure compliance, while also providing strategic planning to minimize your tax liabilities.</p>
            <p className="mt-2">Our proactive approach ensures you are prepared for tax season and that you are taking advantage of all available deductions and credits.</p>
          </div>

          {/* Card 5 */}
          <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">Financial Consulting</h2>
            <p>Our consulting services guide you through financial challenges and help you make informed decisions for growth and stability.</p>
            <p className="mt-2">Whether you are looking for budgeting assistance or strategic planning, our consultants are here to provide the insights you need.</p>
          </div>

          {/* Card 6 */}
          <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">Budgeting Services</h2>
            <p>We help small businesses create and maintain budgets that align with their financial goals and growth strategies.</p>
            <p className="mt-2">Our budgeting services include detailed cash flow projections and expense tracking to ensure you stay on target.</p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default SmallBusinessAccounting;
