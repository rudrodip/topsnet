"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSpring, animated } from "react-spring";
import { Button } from "./ui/button";

const HeroSection: React.FC = () => {
  const springProps = useSpring({
    from: { pathLength: 0 },
    to: { pathLength: 1 },
    config: { duration: 1000 },
  });
  return (
    <div className="bg-transparent py-20 flex justify-evenly items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="text-left lg:w-1/2 lg:my-0 my-5">
            <h1 className="head_text">
              Open Science
            </h1>
            <p className="mt-3 text-lg sm:mt-5 text-left break-words">
              TOPSnet: Uniting Researchers in Open Science. Explore, Share,
              Collaborate, and Discover Together for a More Inclusive Future of
              Scientific Innovation.
            </p>
            <div className="mt-5 sm:mt-8 lg:mt-12">
              <Button asChild>
                <Link
                  href="/explore"
                  className="p-3 rounded-md text-sm text-black"
                >
                  🔎 Explore
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <div>
              <Image
                src="/assets/NASA_logo.svg"
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
