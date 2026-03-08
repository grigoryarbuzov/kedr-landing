module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
      },
      colors: {
        frost: {
          50:  '#f0f6fc',
          100: '#e1eef9',
          200: '#c3ddf3',
          300: '#94c4e8',
          400: '#5ea8d9',
          500: '#4b7ba8',
          600: '#3a6290',
          700: '#2d4d73',
          800: '#1b3a5c',
          900: '#122842',
        },
        snow: {
          50:  '#fafcff',
          100: '#f3f7fb',
          200: '#e8eef5',
          300: '#d5dfe9',
        },
        pine: {
          50:  '#f0f5f0',
          100: '#dce8dc',
          200: '#b5ccb5',
          300: '#8aab8a',
          400: '#5c8a5c',
          500: '#3d6b3a',
          600: '#2d5230',
          700: '#1e3a1e',
          800: '#152a15',
        },
        amber: {
          50:  '#fdf9f0',
          100: '#faf0d6',
          300: '#f0cf7e',
          400: '#e8b94d',
          500: '#c8a45c',
        },
      },
      animation: {
        'pine-roll': 'pineRoll 2.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1.5s both',
        'fade-up': 'fadeUp 0.8s ease-out both',
        'fade-up-1': 'fadeUp 0.8s ease-out 0.3s both',
        'fade-up-2': 'fadeUp 0.8s ease-out 0.5s both',
        'fade-up-3': 'fadeUp 0.8s ease-out 0.7s both',
        'snow-fall': 'snowFall 12s linear infinite',
      },
      keyframes: {
        pineRoll: {
          '0%': { transform: 'translateX(100vw) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.7' },
          '75%': { transform: 'translateX(0) rotate(-1080deg)' },
          '88%': { transform: 'translateX(12px) rotate(-1100deg)' },
          '100%': { transform: 'translateX(0) rotate(-1080deg)', opacity: '0.7' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        snowFall: {
          '0%': { transform: 'translateY(-10%) translateX(0)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(100vh) translateX(20px)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
