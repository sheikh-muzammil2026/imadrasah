/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
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
