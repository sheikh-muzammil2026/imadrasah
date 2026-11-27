/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Turbopack configuration to allow Next.js 16 default Turbopack with custom webpack fallback */
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        pathname: '**',
      },
    ],
  },
  // reactCompiler: true,
  experimental: {
    webpackBuildWorker: false,
    parallelServerCompiles: false,
    parallelServerBuildTraces: false,
    cpus: 1,
  },
  webpack: (config) => {
    return config;
  },
  async redirects() {
    return [
      {
        source: '/hostel',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
