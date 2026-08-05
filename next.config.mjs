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
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: '/hostel',
        destination: '/virtual-campus',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
