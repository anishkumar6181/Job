import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // // domains: ["lh3.googleusercontent.com,s.gravatar.com"],
    // domains: ['s.gravatar.com', 'cdn.auth0.com']
    domains: ["s.gravatar.com"],
    // domains: ["localhost"],
  },
};

// module.exports = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'assets.example.com',
//         port: '',
//         pathname: '/account123/**',
//         search: '',
//       },
//     ],
//   },
// }
export default nextConfig;
