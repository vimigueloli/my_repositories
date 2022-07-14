/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				teal: {
					300: '#5BD6BA',
					800: '#0E2334'
				},
				gray: {
					300: '#27282D',
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
