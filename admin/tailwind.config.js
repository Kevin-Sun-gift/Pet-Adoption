/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "primary": "#eea62b",
                "primary-light": "#f5c566",
                "primary-dark": "#d4911f",
                "background": "#f8f7f6",
                "teal-accent": "#2faeb5",
            },
            fontFamily: {
                "display": ["Plus Jakarta Sans", "Noto Sans SC", "sans-serif"],
                "body": ["Noto Sans SC", "sans-serif"]
            },
        },
    },
    plugins: [],
}
