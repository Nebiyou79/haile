import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Image from 'next/image';

const About = () => {
  return (
    <div>
      <Navbar/>
      <div className="relative min-h-screen">
        {/* Full Background Image */}
        <Image 
          src="/background-image.jpg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0 opacity-70"
        />

        {/* Company Section */}
        <div className="container mx-auto mb-12 p-6 bg-white rounded-lg shadow-lg relative z-10 bg-secondary text-primary dark:bg-primary dark:text-secondary">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-lg">
            At Haile & Associates, PC, we are committed to providing exceptional consulting, accounting, tax, and auditing services. 
            We leverage technology to understand and analyze each business needs and objectives, ensuring personalized interactions.
          </p>
        </div>

        {/* Mission Statement Section */}
        <div className="container mx-auto mb-12 p-6 bg-white rounded-lg shadow-lg flex flex-col md:flex-row items-center relative z-10 bg-secondary text-primary dark:bg-primary dark:text-secondary">
          <div className="w-full md:w-1/2">
            <Image 
              src="/mission-statement.jpg"
              alt="Mission Statement"
              width={500} 
              height={300}
              className="rounded-lg"
            />
          </div>
          <div className="w-full md:w-1/2 md:pl-8 mt-4 md:mt-0 bg-secondary text-primary dark:bg-primary dark:text-secondary">
            <h2 className="text-2xl font-bold mb-4">Our Mission Statement</h2>
            <p className="text-lg">
              Finance World is committed to providing consulting, accounting, tax, and auditing services. We do so by utilizing technology to its fullest capabilities, taking time to understand and analyze a business’s needs, long-term goals, and objectives to personalize each and every interaction.
            </p>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="container mx-auto mb-12 p-6 bg-white rounded-lg shadow-lg flex flex-col md:flex-row items-center relative z-10 bg-secondary text-primary dark:bg-primary dark:text-secondary">
          <div className="w-full md:w-1/2 order-2 md:order-1 md:pr-8 mt-4 md:mt-0">
            <h2 className="text-2xl font-bold mb-4">Company Core Values</h2>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>
                <strong>Continuous Education and Growth:</strong> We commit to continuous professional and personal growth. Increasing our knowledge base allows us to provide top-notch service to our team and our clients.
              </li>
              <li>
                <strong>Honesty and Integrity:</strong> We are straightforward and transparent in our communications with clients and team members, which builds trusting relationships that enable us to work effectively through any issues presented.
              </li>
              <li>
                <strong>Professional/Personal Responsibility:</strong> We take ownership of what we do, keep our commitments, take responsibility for our strategic choices, communicate issues as soon as we are aware of them, and seek solutions.
              </li>
              <li>
                <strong>Respect:</strong> We work as a team, depend on each other, seek direct feedback from clients, and treat others with consideration. This respect ensures that we all thrive in our teamwork and overall project objectives.
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 order-1 md:order-2">
            <Image 
              src="/core-values.jpg"
              alt="Core Values"
              width={500} 
              height={300}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default About;
