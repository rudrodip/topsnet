import React from 'react';
import Image from 'next/image';

const HeroSection: React.FC = () => {
  return (
    <div className="bg-transparent py-20 flex justify-evenly items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="text-left lg:w-1/2">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              Open Science
            </h1>
            <p className="mt-3 text-lg text-gray-100 sm:mt-5 text-left break-words">
              TOPSnet: Uniting Researchers in Open Science. Explore, Share, Collaborate, and Discover Together for a More Inclusive Future of Scientific Innovation.
            </p>
            <div className="mt-5 sm:mt-8 lg:mt-12">
              <a href="/signin" className="p-3 rounded-md text-sm bg-white text-black">
                Get Started
              </a>
            </div>
          </div>

          <div className='flex justify-center items-center'>
            <div>
              <Image 
                src="https://media.tenor.com/RxkhHB6PUmUAAAAC/sherlock-do-your-research.gif"
                alt=""
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
