import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#9c27b0',
    },
  },
  components: {
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
            transform: "translate(150%, -50%)"
          }
        },
        asterisk: {
          display: "none"
        }
      }
    },
  },
});

export default theme;
