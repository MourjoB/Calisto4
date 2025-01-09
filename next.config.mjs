/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,    // Required for static export
    },
    // If you're using basePath, add it here
    // basePath: '',
};

export default nextConfig;