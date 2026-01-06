/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      borderRadius: {
        'sm': '0.125rem',  // WVWO: ONLY allowed border-radius (2px)
        DEFAULT: '0.125rem', // Override Tailwind's 4px default to match WVWO 2px
      },
      // SPEC-19: Heritage Color Palette (Historic Sites & Museums)
      colors: {
        // Existing WVWO brand colors
        'brand-brown': '#3E2723',
        'sign-green': '#2E7D32',
        'brand-cream': '#FFF8E1',
        'brand-mud': '#5D4037',
        'brand-orange': '#FF6F00',
        'charcoal-black': '#212121',
        // Heritage Burgundy (Museums)
        'heritage-burgundy': '#93282c',
        'heritage-burgundy-light': '#c02032',
        // Aged Copper & Gold (Metallic Accents)
        'heritage-gold': '#d18a00',
        'heritage-gold-light': '#ffc655',
        // Coal & Mining Gray (Timelines, Dividers)
        'coal-gray': '#424242',
        'stone-gray': '#757575',
        'creek-stone': '#616161',
        // Forest Heritage Green (Layered Depth)
        'heritage-green': '#0a5861',
        'heritage-green-alt': '#234b43',
        // Aged Paper Cream (Backgrounds)
        'heritage-cream': '#fff8e9',
        'heritage-cream-alt': '#efebe2',
      },
      // SPEC-19: Extended Font Families
      fontFamily: {
        'display': ['Bitter', 'serif'],
        'hand': ['Permanent Marker', 'cursive'],
        'body': ['Noto Sans', 'sans-serif'],
        'marker': ['Roboto Slab', 'serif'],       // Historical markers
        'trail': ['Oswald', 'sans-serif'],         // Trail signage
      },
      // SPEC-19: Custom Box Shadows
      boxShadow: {
        'carved': '2px 2px 0 rgba(0, 0, 0, 0.6)',
        'painted-wood': 'inset 0 0 20px rgba(62, 39, 35, 0.1), 3px 3px 0 rgba(0, 0, 0, 0.2)',
        'lumber': '2px 3px 0 rgba(62, 39, 35, 0.3)',
      },
      // SPEC-19: Skeleton Loading Animations
      animation: {
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
    function({ matchUtilities }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        {
          values: {
            'carved': '2px 2px 0 rgba(0, 0, 0, 0.6)',
          },
        }
      )
    },
  ],
}
