/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      // WVWO Custom Animations (SPEC-07)
      keyframes: {
        // Gentle reveal for adventure cards (stagger entrance)
        'gentle-reveal': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        // Accordion expand (Radix UI)
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        // Accordion collapse (Radix UI)
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'gentle-reveal': 'gentle-reveal 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      // WVWO Brand Colors
      colors: {
        'brand-brown': '#3E2723',
        'sign-green': '#2E7D32',
        'brand-cream': '#FFF8E1',
        'brand-mud': '#5D4037',
        'brand-orange': '#FF6F00',
      },
      // WVWO Typography
      fontFamily: {
        display: ['Bitter', 'serif'],
        hand: ['Permanent Marker', 'cursive'],
        body: ['Noto Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
