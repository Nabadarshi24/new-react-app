// /** @type {import('tailwindcss').Config} */
// const plugin = require('tailwindcss/plugin')
import plugin from "tailwindcss/plugin";

const config = {
  prefix: "tw",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // container: false,
    colors: {
      black: "#000000",
      white: "#ffffff",
      transparent: "transparent",
      primary: "var(--color-primary)",
      secondary: "var(--color-secondary)",
      default: "var(--color-default)",
      "default-light": "var(--color-default-light)",
      "default-dark": "var(--color-default-dark)",
      dark: "var(--color-dark)",
      disable: "var(--color-disable)",
      warning: "var(--color-warning)",
      error: "var(--color-error)",
      // info: "var(--color-info)",
      link: "var(--color-link)",
      "link-dark-bg": "var(--color-link-dark-bg)",
      body: "var(--color-body)",
      footer: "var(--color-footer)",
      content: "var(--color-content)",
      "table-row-bg-hover": "var(--color-table-row-bg-hover)",
      "modal-bg": "var(--color-modal-bg)",
      text: "var(--color-text)",
      grey: "var(--color-grey)",
      "grey-light": "var(--color-grey-light)",
    },
    // extend: {},
    // https://tailwindcss.com/docs/screens
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      "2xl": "1400px",
      "3xl": "1600px",
    },
    extend: {
      fontSize: {
        "5px": "px",
        "6px": "6px",
        "7px": "7px",
        "8px": "8px",
        "9px": "9px",
        "10px": "10px",
        "11px": "11px",
        "12px": "12px",
        "13px": "13px",
        "14px": "14px",
        "15px": "15px",
        "16px": "16px",
        "17px": "17px",
        "18px": "18px",
        "19px": "19px",
        "20px": "20px",
        "21px": "21px",
        "22px": "22px",
        "23px": "23px",
        "24px": "24px",
        "25px": "25px",
        "26px": "26px",
        "27px": "27px",
        "28px": "28px",
        "29px": "29px",
        "30px": "30px",
        "40px": "40px",
        "50px": "50px",
      },
      // lineHeight: {
      //   "5px": "px",
      //   "6px": "6px",
      //   "7px": "7px",
      //   "8px": "8px",
      //   "9px": "9px",
      //   "10px": "10px",
      //   "11px": "11px",
      //   "12px": "12px",
      //   "13px": "13px",
      //   "14px": "14px",
      //   "15px": "15px",
      //   "16px": "16px",
      //   "17px": "17px",
      //   "18px": "18px",
      //   "19px": "19px",
      //   "20px": "20px",
      //   "21px": "21px",
      //   "22px": "22px",
      //   "23px": "23px",
      //   "24px": "24px",
      //   "25px": "25px",
      //   "26px": "26px",
      //   "27px": "27px",
      //   "28px": "28px",
      //   "29px": "29px",
      //   "30px": "30px",
      // },
      spacing: {
        "1px": "1px",
        "2px": "2px",
        "3px": "3px",
        "4px": "4px",
        "5px": "5px",
        "6px": "6px",
        "7px": "7px",
        "8px": "8px",
        "9px": "9px",
        "10px": "10px",
        "11px": "11px",
        "12px": "12px",
        "13px": "13px",
        "14px": "14px",
        "15px": "15px",
        "16px": "16px",
        "17px": "17px",
        "18px": "18px",
        "19px": "19px",
        "20px": "20px",
        "21px": "21px",
        "22px": "22px",
        "23px": "23px",
        "24px": "24px",
        "25px": "25px",
        "30px": "30px",
        "35px": "35px",
        "40px": "40px",
        "45px": "45px",
        "50px": "50px",
        "60px": "60px",
        "70px": "70px",
        "80px": "80px",
        "90px": "90px",
        "100px": "100px",
        "120px": "120px",
        "130px": "130px",
        "150px": "150px",
      },
      borderRadius: {
        "1px": "1px",
        "2px": "2px",
        "3px": "3px",
        "4px": "4px",
        "5px": "5px",
        "6px": "6px",
        "7px": "7px",
        "8px": "8px",
        "9px": "9px",
        "10px": "10px",
        "15px": "15px",
        "20px": "20px",
        "25px": "25px",
        "30px": "30px",
        "35px": "35px",
        "40px": "40px",
        "45px": "45px",
        "50px": "50px",
      },
    },
  },
  // corePlugins: {
  //   container: false
  // },
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      // matchUtilities(
      //   { "text-height": value => ({ lineHeight: value, }), },
      //   {
      //     supportsNegativeValues: true,
      //     // respectPrefix: true,
      //     // respectImportant: true,
      //     values: theme("lineHeight"),
      //   }
      // );
    }),
    // require('tailwind-bootstrap-grid')(
    //   {
    //     containerMaxWidths: {
    //       'sm': '540px',
    //       'md': '720px',
    //       'lg': '960px',
    //       'xl': '1140px',
    //       '2xl': '1320px',
    //       "3xl": '1500px'
    //     },
    //     //   // gridColumns: 12
    //   }
    // ),
    // plugin(function ({ addComponents }) {
    //   addComponents({
    //     '.button-root': {
    //       fontSize: "16px",
    //       fontWeight: "400",
    //       lineHeight: "21px",
    //       letterSpacing: "0px",
    //       padding: "14px 28px 13px",
    //       textTransform: "none",
    //       border: "1px solid #1976d2",
    //       boxShadow: "0px 3px 6px #00000040",
    //       '&.btn-medium': {
    //         fontSize: "12px",
    //         lineHeight: "15px",
    //         padding: "8px 16px 7px"
    //       },
    //       '&.btn-small': {
    //         fontSize: "10px",
    //         lineHeight: "13px",
    //         padding: "5px 16px 4px",
    //         borderRadius: "3px"
    //       },
    //       '&.disabled': {
    //         opacity: ".60"
    //       },
    //       '@media (min-width: 991px)': {
    //         lineHeight: "19px",
    //         padding: "10px 20px 9px",
    //         height: "40px"
    //       },
    //       '@media (min-width: 768px)': {
    //         width: "100%"
    //       }
    //     }
    //   });
    // })
  ],
};

export default config;