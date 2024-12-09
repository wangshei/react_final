/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
   "./src/**/*.{js,jsx,ts,tsx}", 
    "./public/index.html",  
  ],
  theme: {
    extend: {
      colors:{
        paper_white:"#EAEAE0",
        peach:"#F0C1A3",
        tomato:"#E15F18",
        pensive_blue:"#A3BAD7",
        dark_blue:"#3C5364"
      },
      spacing: {        
        '5p': '5%',  // 5% margin        
        '10p': '10%', // 10% margin        
        '20p': '20%', // 20% margin        
        '50p': '50%', // 50% margin      
        },
      fontSize:{
        "title":"42px",
        "subtitle":"32px",
        "nav":"20px",
        "nav_select":"20px",
        "body":"18px"
      },
      fontFamily: {        
        heading: ['Poller One', 'cursive'], 
        sans: ['Kumbh Sans', 'sans-serif']
      }
    },
  },
  plugins: [],
}

