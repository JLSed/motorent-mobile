/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
    theme: {
      extend: {
        colors: {
          'primary': '#12191D',
          'secondary': '#F4F4F4',
          'accent-blue': '#0072E9',
          'accent-gray': '#1C262D',
          'accent-light': '#7C98A9',
        },
        fontFamily: {
          "outfit-regular": ['Outfit-Regular'],
          "outfit-bold": ['Outfit-Bold'],
          "poppins-regular": ['Poppins-Regular'],
          "poppins-bold": ['Poppins-Bold'],
          "monstserrat-regular": ['Montserrat-Regular'],
          "monstserrat-bold": ['Montserrat-Bold'],
        },
      },
    },
    plugins: [],
}