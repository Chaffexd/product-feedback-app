/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'https://project-feedback-app-3bf2b-default-rtdb.europe-west1.firebasedatabase.app/',
        }]
    }
}

module.exports = nextConfig
