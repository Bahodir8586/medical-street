const nextTranslate = require('next-translate');

module.exports = nextTranslate({
  images: {
    domains: ['tailwindui.com'],
  },
  env: {
    APP_ID: '2ca17d2b',
    APP_KEY: 'bc6f947ac433cb191102320c263cb931',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
});
