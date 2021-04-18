module.exports = {
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
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
  variants: {
    extend: {
      opacity: ['disabled']
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
