import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: `${process.env.IMAGES_HOST}`,
        port: '',
        pathname: '**',
      },
    ],
  },
  trailingSlash: true,
};

export default withNextIntl(nextConfig);
