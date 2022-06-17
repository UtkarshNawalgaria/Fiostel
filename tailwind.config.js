module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        green: {
          DEFAULT: '#60B246',
        },
      },
      backgroundImage: theme => ({
        'hero-image': "url('/media/hero_banner.jpg')"
      })
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
