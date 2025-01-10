/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enable React strict mode for debugging
  i18n: {
    locales: ["en", "es", "fr", "de", "pt", "it", "hi", "zh", "ja", "ko"],
    defaultLocale: "en",
  },
};

export default nextConfig;
