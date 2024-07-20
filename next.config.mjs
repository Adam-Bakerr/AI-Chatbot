// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Expose environment variables to the client-side code
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    // Add other environment variables as needed
  },
  webpack: (config, { dev }) => {
    // Custom Webpack configuration (if needed)
    if (dev) {
      console.log('Running in development mode');
    }

    // Example of adding a Webpack plugin
    // config.plugins.push(new SomeWebpackPlugin());

    return config;
  },
};


export default nextConfig;
