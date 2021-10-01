module.exports = {
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            }
        },
        colors: {
            blue: {
                DEFAULT: '#003A99',
                light: '#1873F2'
            }
        }
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
