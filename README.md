# Chalchitra - Your Video Streaming Platform

Chalchitra is an upcoming video streaming platform developed with Next.js, AWS S3 for video storage, Prisma as the ORM, PostgreSQL as the database in a Docker container (currently run locally), NextAuth for authentication, Tailwind CSS for styling, and TypeScript.

## Features

- Seamless video streaming experience
- Secure user authentication powered by NextAuth
- Efficient video storage using AWS S3
- Robust database management with Prisma and PostgreSQL
- Responsive and visually appealing UI with Tailwind CSS

## Technologies Used

- [Next.js](https://nextjs.org/) - A React framework for building server-side rendered applications.
- [AWS S3](https://aws.amazon.com/s3/) - Scalable object storage in the cloud for video storage.
- [Prisma](https://www.prisma.io/) - A modern database toolkit for TypeScript and Node.js.
- [PostgreSQL](https://www.postgresql.org/) - A powerful, open-source relational database system.
- [Docker](https://www.docker.com/) - Containerization platform for easy deployment.
- [NextAuth](https://next-auth.js.org/) - Authentication for Next.js applications.
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for building custom designs.
- [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript for enhanced development.

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/thisisashugupta/chalchitra.git
   ```

2. Install dependencies:

   ```bash
   cd chalchitra
   npm install
   ```

3. Set up your environment variables:

   ```bash
   cp .env.example .env.local
   ```

   Update the variables in the `.env.local` file with your AWS S3 credentials, database connection details, and other necessary configurations.

4. Run the app locally:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.
