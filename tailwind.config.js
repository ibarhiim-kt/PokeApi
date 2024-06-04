/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens:{
        'max-1050px':{'max':'1050px'},
        'max-800px':{'max':'800px'},
        'max-550px':{'max':'550px'},
      }
    },
  },
  plugins: [],
}