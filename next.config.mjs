/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enable React strict mode for debugging
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com", // This is for img.youtube.com
        pathname: "/**", // Allows all paths within this domain
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com", // This is for i.ytimg.com
        pathname: "/**", // Allows all paths within this domain
      },
    ],
  },
  i18n: {
    locales: ["en", "es", "fr", "de", "pt", "it", "hi", "zh", "ja", "ko"],
    defaultLocale: "en",
  },
};

export default nextConfig;
