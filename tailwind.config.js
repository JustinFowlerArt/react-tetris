// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			keyframes: {
				'bounce-once': {
					'0%, 100%': {
						transform: 'translateY(-10%)',
						'animation-timing-function': 'cubic-bezier(0.8,0,1,1)',
					},
					'50%': {
						transform: 'none',
						'animation-timing-function': '(0,0,0.2,1)',
					},
				},
				'ping-once': {
					'0%': {
						opacity: 0,
					},
					'5%': {
						opacity: 1,
					},
					'30%': {
						opacity: 0,
						transform: 'scale(3)',
					},
                    '100%': {
                        opacity: 0,
                    }
				},
			},
			animation: {
				'bounce-once': 'bounce-once .5s linear',
				'ping-once': 'ping-once 1s cubic-bezier(0, 0, 0.2, 1)',
			},
		},
		screens: {
			xs: '475px',
			...defaultTheme.screens,
		},
	},
	plugins: [],
};
