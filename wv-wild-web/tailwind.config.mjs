/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      borderRadius: {
        'sm': '0.125rem',  // WVWO: ONLY allowed border-radius (2px)
        DEFAULT: '0.125rem', // Override Tailwind's 4px default to match WVWO 2px
      },
    },
  },
}
