import Link from "next/link";

const ServicesPage = () => {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Our Services</h1>
        <ul className="space-y-4">
          <li>
            <Link href="/services/small-business-accounting" className="text-blue-500 hover:underline">Small Business Accounting</Link>
          </li>
          <li>
            <Link href="/services/tax-service" className="text-blue-500 hover:underline">Tax Service</Link>
          </li>
          <li>
            <Link href="/services/financial-consulting" className="text-blue-500 hover:underline">Financial Consulting</Link>
          </li>
        </ul>
      </div>
    );
  };
  
  export default ServicesPage;
  