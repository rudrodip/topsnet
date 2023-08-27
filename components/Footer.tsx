import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-16 p-6 text-center bg-secondary">
      <div className="max-w-2xl mx-auto">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} TOPSnet. All rights reserved.
        </p>
        <p className="text-sm mt-2">
          Built with ❤️ - We believe in Open Science & Open Source  
        </p>
        <div className="flex justify-center mt-6 space-x-4">
          <a
            href="https://github.com/rudrodipsarker"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://zenodo.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Zenodo
          </a>
          <a
            href="https://orcid.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            ORCID
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
