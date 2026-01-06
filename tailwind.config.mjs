/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      borderRadius: {
        'sm': '0.125rem',  // WVWO: ONLY allowed border-radius (2px)
        DEFAULT: '0.125rem',
      },

      // WVWO Brand Colors (Existing)
      colors: {
        'brand-brown': '#3E2723',
        'sign-green': '#2E7D32',
        'brand-cream': '#FFF8E1',
        'brand-mud': '#5D4037',
        'brand-orange': '#FF6F00',

        // SPEC-19: Heritage Burgundy (Museums)
        'heritage-burgundy': '#93282c',
        'heritage-burgundy-light': '#c02032',

        // SPEC-19: Aged Copper & Gold (Metallic Accents)
        'heritage-gold': '#d18a00',
        'heritage-gold-light': '#ffc655',

        // SPEC-19: Coal & Mining Gray (Timelines, Dividers)
        'coal-gray': '#424242',
        'stone-gray': '#757575',
        'creek-stone': '#616161',

        // SPEC-19: Forest Heritage Green (Layered Depth)
        'heritage-green': '#0a5861',
        'heritage-green-alt': '#234b43',

        // SPEC-19: Aged Paper Cream (Backgrounds)
        'heritage-cream': '#fff8e9',
        'heritage-cream-alt': '#efebe2',

        // High Contrast
        'charcoal-black': '#212121',
      },

      // SPEC-19: Extended Font Families
      fontFamily: {
        'display': ['Bitter', 'serif'],
        'hand': ['Permanent Marker', 'cursive'],
        'body': ['Noto Sans', 'sans-serif'],
        'marker': ['Roboto Slab', 'serif'],       // Historical markers
        'trail': ['Oswald', 'sans-serif'],         // Trail signage
      },

      // SPEC-19: Organic Spacing Scale
      spacing: {
        '18': '4.5rem',   // 72px
        '22': '5.5rem',   // 88px
      },

      // SPEC-19: Custom Box Shadows
      boxShadow: {
        'carved': '2px 2px 0 rgba(0, 0, 0, 0.6)',
        'painted-wood': 'inset 0 0 20px rgba(62, 39, 35, 0.1), 3px 3px 0 rgba(0, 0, 0, 0.2)',
        'lumber': '2px 3px 0 rgba(62, 39, 35, 0.3)',
      },

      // SPEC-19: Skeleton Loading Animations
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },

      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [
    // SPEC-19: Text Shadow Plugin
    function({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: { 'carved': '2px 2px 0 rgba(0, 0, 0, 0.6)' } }
      )
    },
  ],
}
