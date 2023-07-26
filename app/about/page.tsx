// Import necessary modules
import React from 'react';
import Image from 'next/image';

const About = () => {
  return (
    <div className="min-h-screen">
      <div className="px-4 py-8 md:w-2/3 mx-auto">
        <h1 className="text-5xl font-bold mb-8 blue_gradient">
          Transform to Open Science Network (TOPSnet)
        </h1>
        <div className="flex justify-center mb-8">
          <Image
            src="/assets/images/open_science_areas.png"
            alt="TOPSnet"
            width={500}
            height={500}
          />
        </div>
        <p className="text-lg mb-6 text-gray-300">
          Welcome to TOPSnet, a cutting-edge social media platform designed exclusively for researchers, scientists, and students. At TOPSnet, we are committed to fostering a collaborative ecosystem of open science and empowering users to explore, share, and discuss research papers, datasets, and scholarly insights freely.
        </p>
        <p className="text-lg mb-6 text-gray-300">
          Inspired by NASA&apos;s Transform to Open Science (TOPS) mission, our platform aims to create an inclusive and accessible scientific community, breaking down barriers and encouraging diverse participation. We believe that open science accelerates discovery, builds a more equitable world, and allows minds from all walks of life to participate in science.
        </p>
        <h2 className="text-3xl font-bold mb-4 blue_gradient">
          Our Goals
        </h2>
        <div className="flex justify-center mb-8">
          <Image
            src="/assets/images/open_science.png"
            alt="TOPSnet"
            width={500}
            height={500}
          />
        </div>
        <ul className="list-disc pl-8 mb-6 text-gray-300 font-bold">
          <li className="text-lg mb-4">Accelerate major scientific discoveries through open collaboration and shared knowledge.</li>
          <li className="text-lg mb-4">Broaden participation by historically excluded communities, fostering diversity and inclusivity in scientific research.</li>
          <li className="text-lg mb-4">Increase understanding and adoption of open science principles and techniques.</li>
          <li className="text-lg mb-4">Promote transparency, reproducibility, and trust in research findings.</li>
          <li className="text-lg mb-4">Provide a seamless user experience with personalized research recommendations and intuitive navigation.</li>
          <li className="text-lg mb-4">Encourage collaboration among researchers and facilitate team formation for research projects.</li>
        </ul>
        <h2 className="text-3xl font-bold mb-4 blue_gradient">
          Platform Features
        </h2>
        <ul className="list-disc pl-8 mb-6 text-gray-300">
          <li className="text-lg mb-4">
            <span className="font-bold">Research Search Engine:</span> Discover research papers, datasets, and other open research resources with advanced search filters. All papers are sourced from <a href="https://zenodo.org" target="_blank" rel="noopener noreferrer" className="underline">Zenodo.org</a>, a leading open-access research repository that supports NASA&apos;s Transform to Open Science (TOPS) goals. By curating high-quality content, Zenodo helps accelerate scientific discovery and promotes collaboration among researchers worldwide.
          </li>
          <li className="text-lg mb-4">
            <span className="font-bold">Research Recommendation Engine:</span> Receive personalized research recommendations based on your interests and activity. Our platform leverages machine learning powered by <a href="https://pytorch.org" target="_blank" rel="noopener noreferrer" className="underline">PyTorch</a> to suggest relevant papers from Zenodo, ensuring you stay informed and engaged with the latest open science advancements.
          </li>
          <li className="text-lg mb-4">
            <span className="font-bold">Read Research Paper:</span> Enjoy a user-friendly reading interface to access research papers directly within the platform. All papers are seamlessly integrated from Zenodo, allowing you to delve into the fascinating world of open science and cutting-edge research.
          </li>
          <li className="text-lg mb-4">
            <span className="font-bold">Share Research Paper:</span> Easily upload and share your research papers with a wider audience, contributing to the collective knowledge pool and advancing NASA&apos;s commitment to open science. Attribute the original authors and link to the corresponding Zenodo record to give credit to researchers worldwide.
          </li>
          <li className="text-lg mb-4">
            <span className="font-bold">Collaboration Tools:</span> Find potential collaborators for your research projects and communicate seamlessly. Our platform encourages interdisciplinary teamwork, aligning with NASA&apos;s vision to broaden participation by historically excluded communities and foster diversity and inclusivity in scientific research.
          </li>
          <li className="text-lg mb-4">
            <span className="font-bold">Open Science Events and Webinars:</span> Participate in virtual events and workshops to learn about open science practices. Our collaboration with NASA&apos;s TOPS initiative and partners aims to promote open science principles, techniques, and adoption, nurturing a global community of researchers ready to face 21st-century challenges.
          </li>
          <li className="text-lg mb-4">
            <span className="font-bold">Open Peer Review System:</span> Contribute to the transparent peer review process for research papers, supporting NASA&apos;s commitment to trust, reproducibility, and transparency in scientific findings. Our open peer review system ensures a collaborative and constructive environment where ideas are shared openly and scientific debate thrives.
          </li>
          <li className="text-lg mb-4">
            <span className="font-bold">Educational Resources:</span> Access materials on open science principles and best practices. TOPSnet collaborates with organizations like ORCID to provide educational resources that empower researchers to embrace open science, contributing to NASA&apos;s mission of creating a scientific culture ready for 21st-century challenges.
          </li>
        </ul>
        <p className="text-lg text-gray-300">
          Join us at TOPSnet and be a part of the open science revolution. Together, we can advance scientific discovery, promote collaboration, and create a more equitable and inclusive world of knowledge sharing and innovation.
        </p>
      </div>
    </div>
  );
};

export default About;
