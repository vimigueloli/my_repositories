/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				purple: {
					300: '#9538F2',
					600: '#460E4D',
					700: '#5A278C',
					800: '#3B2559'
				},
				gray: {
					700: '#141317',
				},
			},
			fontFamily: {
				'inter': ['"Inter"', 'sans-serif'],
			}
		},
		screens: {
			'st': '400px',
			'sm': '640px',
			'md': '768px',
			'lg': '1024px',
			'xl': '1280px',
			'2xl': '1536px',
			'3xl': '1920px',
		},
	},
	plugins: [],
	experimental: {
		applyComplexClasses: true,
	},
}
