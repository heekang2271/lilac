/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/business',
        destination: '/business/our-purpose',
        permanent: true,
      },
      {
        source: '/technology',
        destination: '/technology/platform-link',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/contact/business-contact',
        permanent: true,
      },
    ];
  },
  images: {
    domains: ['52.79.235.146'],
  },
};

module.exports = nextConfig;
