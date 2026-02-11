/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'cyber-navy': '#0f172a',
                'electric-blue': '#0ea5e9',
                'neon-cyan': '#22d3ee',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'], // Ensure Inter is used if available, or default sans
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'customFloat 6s ease-in-out infinite',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            }
        },
    },
    plugins: [],
}
