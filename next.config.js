/** @type {import('next').NextConfig} */
if (!process.env.NEXT_PUBLIC_BLOB_BASE_URL) {
    throw new Error("NEXT_PUBLIC_BLOB_BASE_URL must be configured.");
}

const nextConfig = {
    cacheComponents: true,
    partialPrefetching: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: new URL(process.env.NEXT_PUBLIC_BLOB_BASE_URL).hostname,
            },
        ],
    },
    webpack(config) {
        // Grab the existing rule that handles SVG imports
        const fileLoaderRule = config.module.rules.find((rule) =>
            rule.test?.test?.(".svg"),
        );

        config.module.rules.push(
            // Reapply the existing rule, but only for svg imports ending in ?url
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/, // *.svg?url
            },
            // Convert all other *.svg imports to React components
            {
                test: /\.svg$/i,
                resourceQuery: { not: /url/ }, // exclude if *.svg?url
                use: ["@svgr/webpack"],
            },
            {
                test: /\.node$/,
                loader: "node-loader",
            },
        );

        // Modify the file loader rule to ignore *.svg, since we have it handled now.
        fileLoaderRule.exclude = /\.svg$/i;

        return config;
    },
};

module.exports = nextConfig;
