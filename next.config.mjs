/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "biblematch.s3.us-east-1.amazonaws.com",
        pathname: "/**", // required for S3 signed URLs
      },
    ],
  },
};

export default nextConfig;
