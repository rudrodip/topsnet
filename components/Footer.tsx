import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-16 p-6 text-white text-center bg-gray-900">
      <div className="max-w-2xl mx-auto">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} TOPSnet. All rights reserved.
        </p>
        <p className="text-sm mt-2">
          Built with ❤️ using React and Tailwind CSS.
        </p>
        <div className="flex justify-center mt-6 space-x-4">
          <a
            href="https://github.com/rudrodipsarker"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            GitHub
          </a>
          <a
            href="https://zenodo.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            Zenodo
          </a>
          <a
            href="https://orcid.org/your-orcid-id"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            ORCID
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
