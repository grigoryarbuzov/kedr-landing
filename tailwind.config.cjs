module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        hero: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
      },
      colors: {
        frost: {
          50:  '#f5f9f3',
          100: '#e8f0e2',
          200: '#cfddc4',
          300: '#a6c194',
          400: '#7ea069',
          500: '#5a8049',
          600: '#456336',
          700: '#344c29',
          800: '#1f3a1f',
          900: '#112e1c',
        },
        snow: {
          50:  '#fdfbf3',
          100: '#f7f1de',
          200: '#efe5c8',
          300: '#e2d2a4',
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
'fade-up': 'fadeUp 0.8s ease-out both',
        'fade-up-1': 'fadeUp 0.8s ease-out 0.3s both',
        'fade-up-2': 'fadeUp 0.8s ease-out 0.5s both',
        'fade-up-3': 'fadeUp 0.8s ease-out 0.7s both',
        'snow-fall': 'snowFall 12s linear infinite',
      },
      keyframes: {
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
