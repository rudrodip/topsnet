import React from 'react';

const ContactPage = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center">
      <div className="bg-opacity-40 max-w-lg mx-auto p-8 shadow-lg rounded-lg bg-secondary">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg mb-6">Have questions or want to get in touch? Reach out to us through the following channels:</p>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
            <a
              href="mailto:official.rudrodipsarker@gmail.com"
              className="underline_animation"
            >
              official.rudrodipsarker@gmail.com
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 3a1 1 0 011 1v1.293a1 1 0 01-.293.707l-3 3a1 1 0 00-.222.32l-1 2a1 1 0 00.071 1.015 1 1 0 00.587.293H7a4 4 0 016 0h1a1 1 0 00.707-.293 1 1 0 000-1.414l-1-1 2-3a1 1 0 00.32-.222l3-3A1 1 0 0117.707 4H19a1 1 0 011 1v7a4 4 0 01-1.1 2.757l-1 1 .293.293V16a1 1 0 01-1 1h-5a2 2 0 01-2-2V6a2 2 0 012-2z"
              />
            </svg>
            <a
              href="https://github.com/rudrodip"
              target="_blank"
              rel="noopener noreferrer"
              className="underline_animation"
            >
              github.com/rudrodip
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8zm0 0c-2.2-1.6-4-4.5-4-7.3a6 6 0 1112 0c0 2.8-1.8 5.7-4 7.3z"
              />
            </svg>
            <a
              href="https://rudrodip.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="underline_animation"
            >
              rudrodip.vercel.app
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
