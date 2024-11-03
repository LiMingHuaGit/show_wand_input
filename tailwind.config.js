module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        magic: ['var(--font-magic)'],
      },
      keyframes: {
        'fade-out-slow': {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(20px)',
          },
          '20%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
          '80%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
          '100%': { 
            opacity: '0.7',
            transform: 'translateY(-10px)',
          },
        },
        'flame-flicker': {
          '0%, 100%': { 
            transform: 'scaleY(1) translateY(0)',
            opacity: '0.9'
          },
          '50%': { 
            transform: 'scaleY(1.2) translateY(-10%)',
            opacity: '1'
          }
        },
        'flame-dance': {
          '0%': { 
            transform: 'rotate(-1deg) translateX(-2%)'
          },
          '25%': {
            transform: 'rotate(0deg) translateX(0)'
          },
          '50%': { 
            transform: 'rotate(1deg) translateX(2%)'
          },
          '75%': {
            transform: 'rotate(0deg) translateX(0)'
          },
          '100%': {
            transform: 'rotate(-1deg) translateX(-2%)'
          }
        },
        'bulb-glow': {
          '0%': { 
            opacity: '0.3',
            boxShadow: '0 0 20px rgba(253, 224, 71, 0.2)'
          },
          '50%': {
            opacity: '0.5',
            boxShadow: '0 0 40px rgba(253, 224, 71, 0.4)'
          },
          '100%': { 
            opacity: '0.4',
            boxShadow: '0 0 30px rgba(253, 224, 71, 0.3)'
          }
        },
        'inner-glow': {
          '0%, 100%': { 
            opacity: '0.6',
            transform: 'scale(0.95) translateY(5%)'
          },
          '50%': { 
            opacity: '0.8',
            transform: 'scale(1.05) translateY(-5%)'
          }
        },
        'core-glow': {
          '0%, 100%': { 
            opacity: '0.8',
            transform: 'scale(0.9)',
          },
          '50%': { 
            opacity: '1',
            transform: 'scale(1.1)',
          },
        },
        'halo': {
          '0%, 100%': {
            opacity: '0.1',
            transform: 'scale(1.5)'
          },
          '50%': {
            opacity: '0.2',
            transform: 'scale(2)'
          }
        },
      },
      animation: {
        'fade-out-slow': 'fade-out-slow 2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'flame-flicker': 'flame-flicker 3s ease-in-out infinite',
        'flame-dance': 'flame-dance 8s ease-in-out infinite',
        'bulb-glow': 'bulb-glow 4s ease-in-out infinite',
        'inner-glow': 'inner-glow 2.5s ease-in-out infinite',
        'core-glow': 'core-glow 2s ease-in-out infinite',
        'halo': 'halo 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} 