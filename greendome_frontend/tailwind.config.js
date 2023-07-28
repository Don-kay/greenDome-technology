/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    maxWidth: {
      md: "126px",
      xmd: "406px",
      thead: "1200px",
    },
    transitionProperty: {
      500: "500ms ease all",
      800: "800ms ease all",
    },

    extend: {
      zIndex: {
        "-10": "-10",
      },
      minWidth: {
        maxo: "84%",
        innerlay: "80%",
        innerlay2: "20%",
        maxc: "95%",
        mino: "16%",
        minc: "5%",
        sidebarImg: "80%",
      },
      maxWidth: {
        maxo: "80%",
        innerlay: "70%",
        maxc: "95%",
        mino: "20%",
        minc: "5%",
        minnelayer: "100%",
        overviewLayer: "70%",
      },
      height: {
        any: "11vh",
        unimport: "auto !important",
        76: "76%",
      },
      fontSize: {
        15: "15px",
        16: "16px",
        17: "17px",
      },
      padding: {
        responsive: "max(4vh, 6rem)",
        responsive2: "max(2vh, 3rem)",
        responsive3: "max(1vh, 2rem)",
        responsive4: "max(0vh, 0.9rem)",
      },
      backgroundColor: {
        // dark: "hsl(98, 89%, 7%)",
      },
      borderWidth: {
        width1px: "1px",
      },
      colors: {
        transparent: "transparent",
        dark: "hsl(106, 91%, 5%)",
        white: "#ffffff",
        purple: "#3f3cbb",
        midnight: "#121063",
        metal: "hsl(106, 10%, 49%)",
        tahiti: "#3ab7bf",
        silver: "#ecebff",
        bubblegum: "#ff77e9",
        bermuda: "#78dcca",
      },
      borderColor: {
        blackui: "black",
      },
    },
  },
  plugins: [],
};
