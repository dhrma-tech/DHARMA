const isDev = process.env.NODE_ENV !== 'production';
const supabaseOrigin = process.env.NEXT_PUBLIC_SUPABASE_URL ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).origin : '';

// 'unsafe-inline' scripts are needed for next-themes' no-flash script and JSON-LD
// (no nonce middleware on a static site). Vercel Analytics/Speed Insights load from
// same-origin /_vercel/* in production and va.vercel-scripts.com in dev; vercel.live
// is the preview-deployment toolbar.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com https://vercel.live${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://images.unsplash.com https://vercel.live https://vercel.com",
  "font-src 'self' data:",
  `connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com https://vercel.live ${supabaseOrigin}${isDev ? ' ws:' : ''}`.trim(),
  'frame-src https://vercel.live',
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
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
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
  async redirects() {
    return [{ source: '/resume', destination: '/Profile.pdf', permanent: false }];
  },
};

export default nextConfig;
