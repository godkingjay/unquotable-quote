import { nextui } from '@nextui-org/theme';
import twTypography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./styles/**/*.{js,ts,jsx,tsx,mdx}',
		'./providers/**/*.{js,ts,jsx,tsx,mdx}',
		'./lib/**/*.{js,ts,jsx,tsx,mdx}',
		'./hooks/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['var(--font-sans)'],
				mono: ['var(--font-geist-mono)'],
			},
		},
	},
	darkMode: 'class',
	plugins: [nextui(), twTypography()],
};
