/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["img.youtube.com"], // Add img.youtube.com as an allowed domain for images
  },
};

export default nextConfig;
