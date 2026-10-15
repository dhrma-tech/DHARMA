/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  experimental: {
    // These routes read content/ at request time via fs, which file tracing can't see.
    outputFileTracingIncludes: {
      '/api/views/[slug]': ['./content/**/*'],
      '/api/cron/reindex': ['./content/**/*'],
    },
  },
  async redirects() {
    return [{ source: '/resume', destination: '/Profile.pdf', permanent: false }];
  },
};

export default nextConfig;
