/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,vue,md}',
    './src/.vitepress/**/*.{js,ts,vue}'
  ],
  corePlugins: {
    preflight: false // 关闭 Preflight，确保 VitePress 内置排版不受污染
  },
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FEF3C7',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E'
        }
      }
    }
  },
  plugins: []
};
