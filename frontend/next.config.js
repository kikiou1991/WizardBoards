const { hostname } = require('os')

/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: "/wizardboards",
    images: {
        remotePatterns: [{
            protocol: "https",
            hostname:'media.istockphoto.com',
           
        }
        ]
    }
}

module.exports = nextConfig
