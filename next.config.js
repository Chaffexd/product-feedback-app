/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "https://project-feedback-app-3bf2b-default-rtdb.europe-west1.firebasedatabase.app/",
      },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' }
    ],
  },
};

module.exports = nextConfig;
