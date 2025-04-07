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
              },
            },
            {
              props: { variant: "subtitle1" },
              style: {
                color: "#D92D20",
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
          color: "#1F2937",
          "&.Mui-required::after": {
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
                borderColor: "#7530FE",
                color: "#7530FE",
                "&:hover": {
                  borderColor: "#9159FE",
                  color: "#7530FE",
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
  },
});

export default theme;
