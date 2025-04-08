"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#107AE6",
    },
    background: {
      default: "#FFFFFF",
      paper: "#F4F9FF",
    },
  },
  typography: {
    fontFamily: "var(--font-inter-sans), sans-serif",
    fontSize: 14,
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: "14px",
          lineHeight: "20px",
          variants: [
            {
              props: { variant: "body1" },
              style: {
                color: "#242634",
                fontWeight: 700,
              },
            },
            {
              props: { variant: "body2" },
              style: {
                color: "#6D6D6D",
              },
            },
            {
              props: { variant: "h6" },
              style: {
                color: "#242634",
                fontWeight: 400,
              },
            },
            {
              props: { variant: "caption" },
              style: {
                color: "#107AE6",
                fontWeight: 500,
              },
            },
            {
              props: { variant: "subtitle1" },
              style: {
                color: "#D92D20",
                lineHeight: "22px",
                fontWeight: 600,
              },
            },
            {
              props: { variant: "h1" },
              style: {
                color: "#020B15",
                fontWeight: 700,
                fontSize: "24px",
                lineHeight: "16px",
              },
            },
          ],
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          display: "inline-block",
          marginBottom: 8,
          fontSize: "14px",
          fontWeight: 600,
          color: "#242634",
          "&::after": {
            content: "''",
            borderRadius: "2px",
            position: "absolute",
            width: "4px",
            height: "4px",
            backgroundColor: "#D8346D",
            top: "50%",
            transform: "translate(150%, -50%)",
          },
        },
        asterisk: {
          display: "none",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          border: "none",
          fontSize: "14px",
        },
        input: {
          "&::placeholder": {
            opacity: 0.7,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: 0,
          height: 20,
        },
        root: {
          padding: "11px 11px",
          border: "1px solid",
          backgroundColor: "#FFFFFF",
          borderColor: "#E5E7EB",
          borderRadius: "8px",
          transition: "border 120ms ease-in",
          variants: [
            {
              props: {
                size: "small",
              },
              style: {
                padding: "7px 11px",
              },
            },
            {
              props: {
                size: "medium",
              },
              style: {
                padding: "11px 11px",
              },
            },
            {
              props: {
                size: "large",
              },
              style: {
                padding: "14px 11px",
              },
            },
          ],
        },
        notchedOutline: {
          border: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderWidth: "1px",
          borderStyle: "solid",
          borderRadius: "8px",
          color: "#FFFFFF",
          padding: "10px 14px",
          "& .MuiButton-startIcon, & .MuiButton-endIcon": {
            fontSize: "14px",
            color: "#FFFFFF",
          },
          textTransform: "none",
          variants: [
            {
              props: { color: "primary" },
              style: {
                backgroundColor: "#107AE6",
                borderColor: "#107AE6",
                boxShadow: "none",
                color: "#FFFFFF",
                "&.Mui-disabled": {
                  backgroundColor: "#AC83FE",
                  borderColor: "#9159FE",
                  color: "#E3D6FF",
                },
                "&:hover": {
                  boxShadow: "none",
                },
              },
            },
            {
              props: { variant: "outlined" },
              style: {
                backgroundColor: "#FFFFFF",
                borderColor: "#E9EAEB",
                color: "#242634",
                "&:hover": {
                  borderColor: "#E9EAEB",
                },
                "&.Mui-disabled": {
                  color: "#AC83FE",
                },
              },
            },
            {
              props: { variant: "ghost" },
              style: {
                borderColor: "transparent",
                backgroundColor: "transparent",
                color: "#7530FE",
                "&:hover": {
                  color: "#5E26CB",
                },
                "&.Mui-disabled": {
                  color: "#AC83FE",
                },
              },
            },
          ],
        },
        sizeLarge: {
          padding: "14px 20px",
          fontSize: "16px",
          lineHeight: "18px",
        },
        sizeMedium: {
          padding: "10px 20px",
          fontSize: "14px",
          lineHeight: "18px",
        },
        sizeSmall: {
          padding: "8px 20px",
          fontSize: "12px",
          lineHeight: "14px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          boxShadow: "none",
          padding: "0px",
          backgroundColor: "#FFFFFF",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "0px",
          "&:last-child": {
            paddingBottom: "0px",
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          backgroundColor: "#E9EAEB",
        },
        bar1: {
          backgroundColor: "#107AE6",
          borderRadius: "8px",
        },
      },
    },
  },
});

export default theme;
