/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'ping-slow': 'ping 3s linear infinite',
        'wiggle' : 'wiggle 1s ease-in-out infinite'
      }
    },
    fontSize: {
      xxs: '0.3rem',
    },
  },
  plugins: [],
}
