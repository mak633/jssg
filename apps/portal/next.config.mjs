/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  i18n: {
    locales: ['en-GB'],
    defaultLocale: 'en-GB',
  }
};

export default nextConfig;
