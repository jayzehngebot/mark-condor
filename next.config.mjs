/** @type {import('next').NextConfig} */
import nrExternals from '@newrelic/next/load-externals.js';

const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['newrelic']
  },
  webpack: (config) => {
    nrExternals(config);
    return config;
  }
};


export default nextConfig;