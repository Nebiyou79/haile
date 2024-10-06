import React from 'react';
import Image from 'next/image';

interface ServiceSectionProps {
  title: string;
  description: string;
  imageUrl: string;
}

const ServiceSection: React.FC<ServiceSectionProps> = ({ title, description, imageUrl }) => {
  return (
    <div className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-md mt-6 p-6">
      <div className="w-full md:w-1/2">
        <Image src={imageUrl} alt={title} width={500} height={400} className="rounded-md" />
      </div>
      <div className="w-full md:w-1/2 md:pl-6 mt-4 md:mt-0">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="mt-2 text-lg">{description}</p>
      </div>
    </div>
  );
};

export default ServiceSection;
