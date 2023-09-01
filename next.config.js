const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer({
  images: {
    domains: ['cdn.sanity.io', 'localhost', 'img.cdn.zostel.com'],
  },
})
