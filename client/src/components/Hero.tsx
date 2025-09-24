import React from 'react';

const Hero = () => {
  return (
    <div className="relative w-full h-[70vh] flex items-center justify-center text-white bg-no-repeat bg-cover" style={{ backgroundImage: "url('/hero-background.jpg')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center p-6">
        <h1 className="text-5xl font-bold">Work Together to Help You Reach Financial Success</h1>
        <p className="mt-4 text-xl">
          Welcome to Finance World — Your trusted partner in financial growth.
        </p>
        <p className="mt-2">Providing personalized consulting, accounting, tax, and auditing services.</p>
      </div>
    </div>
  );
};

export default Hero;
