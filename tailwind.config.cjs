module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        forest: {
          50:  '#f2f5f0',
          100: '#e0e8db',
          200: '#bfd1b5',
          300: '#94b084',
          400: '#6b8f5b',
          500: '#4a6b3a',
          600: '#3a5530',
          700: '#2d4226',
          800: '#1e2e1a',
          900: '#111c0f',
        },
        gold: {
          50:  '#fdf9f0',
          100: '#faf0d6',
          200: '#f5e0ad',
          300: '#f0cf7e',
          400: '#e8b94d',
          500: '#c8a45c',
          600: '#a48354',
          700: '#7d6340',
          800: '#5c4a30',
          900: '#3d3220',
        },
        cream: {
          50:  '#fefcf9',
          100: '#faf7f1',
          200: '#f5ede1',
          300: '#ede2d0',
        },
      },
      animation: {
        'pine-roll': 'pineRoll 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1.5s both',
        'fade-up': 'fadeUp 0.8s ease-out both',
        'fade-up-delay-1': 'fadeUp 0.8s ease-out 0.2s both',
        'fade-up-delay-2': 'fadeUp 0.8s ease-out 0.4s both',
        'fade-up-delay-3': 'fadeUp 0.8s ease-out 0.6s both',
      },
      keyframes: {
        pineRoll: {
          '0%': { transform: 'translateX(100vw) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.8' },
          '75%': { transform: 'translateX(0) rotate(-1080deg)' },
          '88%': { transform: 'translateX(12px) rotate(-1100deg)' },
          '100%': { transform: 'translateX(0) rotate(-1080deg)', opacity: '0.8' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
