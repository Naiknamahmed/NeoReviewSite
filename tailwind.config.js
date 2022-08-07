module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: { 
      screens: {
        '3xl': '1920px',
        // => @media (min-width: 1920px) { ... }
        '4xl': '2350px',
        // => @media (min-width: 2350px) { ... }
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
