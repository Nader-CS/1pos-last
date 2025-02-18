import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig = {};

export default withNextIntl({
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.IMAGES_HOST,
      },
    ],
  },
});
