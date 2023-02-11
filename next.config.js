/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    MONGO_URI:
      "mongodb+srv://anthony:admin123@cluster0.kzgwkex.mongodb.net/bookit?retryWrites=true&w=majority",
  },
  images: {
    domains: ["a0.muscache.com"],
  },
};

module.exports = nextConfig;
