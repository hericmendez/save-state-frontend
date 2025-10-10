/** @type {import('postcss-load-config').Config} */
const config = {
    darkMode: ['class', '[data-theme="dark"]'],
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
