# TOPSnet Web Application

TOPSNET is a professional web application built to accelerate NASA's transformation to open science goals. The platform enables researchers to discover, share, and collaborate on open research papers and resources. The application is developed using Next.js 13, Tailwind CSS, TypeScript, and integrates Firebase for database and authentication functionalities.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Credits](#credits)
- [Contact](#contact)
- [License](#license)

## Features

- Research Search Engine: Discover research papers, datasets, and other open research resources with advanced search filters.
- Research Recommendation Engine: Receive personalized research recommendations based on your interests and activity.
- Read Research Paper: Enjoy a user-friendly reading interface to access research papers directly within the platform.
- Share Research Paper: Easily upload and share your research papers with a wider audience.
- Collaboration Tools: Find potential collaborators for your research projects and communicate seamlessly.
- Open Science Events and Webinars: Participate in virtual events and workshops to learn about open science practices.
- Open Peer Review System: Contribute to the transparent peer review process for research papers.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/rudrodip/topsnet.git
   cd topsnet
   ```

2. Install the required dependencies:

   ```bash
   yarn
   yarn dev
   ```

3. Set up Firebase:

   - Create a Firebase project on the Firebase console (https://console.firebase.google.com/).
   - Enable Firebase Authentication and Firestore Database.
   - Copy your Firebase configuration (apiKey, authDomain, projectId, etc.) from the Firebase console and replace it in `firebase/firebaseConfig.ts`.

4. Run the development server:

   ```bash
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:3000` to access the TOPSNET web application.

## Technologies

The TOPSNET web application is built with the following technologies:

- Next.js 13
- Tailwind CSS
- TypeScript
- Firebase (Firestore, Authentication)

## Credits

The development of TOPSNET is made possible by the following organizations and platforms:

- [Zenodo](https://zenodo.org): Providing access to research papers and resources.
- [ORCID](https://orcid.org): Enabling unique and persistent identifiers for researchers.
- [NASA](https://www.nasa.gov): Inspiring scientific discoveries and open science initiatives.

## Contact

For any inquiries or support, you can reach out to the developer:

- Email: official.rudrodipsarker@gmail.com
- GitHub: [rudrodip](https://github.com/rudrodip)
- Personal Website: [https://rudrodipsarker.vercel.app](https://rudrodipsarker.vercel.app)

## License

The TOPSNET web application is open-source and licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute the code according to the terms of the license.