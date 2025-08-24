/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brandPurple: "#8E44AD",
                brandPink: "#D98880",
            },
            backgroundImage: {
                "gradient-brand": "linear-gradient(to right, #8E44AD, #D98880)",
            },
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
             },
        },
    },
    plugins: [],
}

