import React from 'react';

interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string; // Optional className for custom styles
}

const Section: React.FC<SectionProps> = ({ title, children, className = '' }) => {
  return (
    <section className={`py-12 px-4 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {title && <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>}
        {children}
      </div>
    </section>
  );
};

export default Section;
