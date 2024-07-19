import { amber, deepPurple, grey, blue, common } from "@mui/material/colors";

const palette = {
  light: {
    primary: {
      main: "#000",
      light: "#C196DD",
      dark: "#8D71D0",
    },
  },
  dark: {
    primary: {
      main: "#fff",
      light: "#5936B4",
      dark: "#362A84",
    },
  },
};

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            main: palette.light.primary.main,
            light: palette.light.primary.light,
            dark: palette.light.primary.dark,
          },

          divider: amber[200],
          background: {
            default: deepPurple[200],
            paper: deepPurple[200],
          },
          text: {
            primary: grey[700],
            secondary: grey[700],
          },
        }
      : {
          primary: {
            main: palette.dark.primary.main,
            light: palette.dark.primary.light,
            dark: palette.dark.primary.dark,
          },
          divider: deepPurple[700],
          background: {
            default: deepPurple[900],
            paper: deepPurple[900],
          },
          text: {
            primary: palette.dark.primary.main,
            secondary: grey[300],
          },
        }),
  },
  typography: {
    fontFamily: [
      "Oswald",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    body1: {
      fontFamily: "Poppins, Arial, sans-serif",
    },
  },
});

export const getThemedComponents = (mode) => ({
  components: {
    ...(mode === "light"
      ? {
          MuiAppBar: {
            styleOverrides: {
              colorPrimary: {
                backgroundColor: grey[800],
              },
            },
          },
          MuiLink: {
            variant: "h3",
          },
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 0,
                color: common.white,
                fontFamily:
                  "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
                fontSize: 20,
                borderWidth: 2,
                "&:hover": {
                  borderWidth: 2,
                },
              },
            },
            variants: [
              {
                props: { variant: "contained" },
                style: {
                  fontFamily:
                    "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
                },
              },
              {
                props: { variant: "outlined" },
                style: {
                  color: palette.light.primary.main,
                },
              },
              {
                props: { variant: "primary", color: "primary" },
                style: {
                  border: "4px dashed blue",
                },
              },
            ],
          },
          MuiList: {
            styleOverrides: {
              root: {},
            },
          },
          MuiMenuItem: {
            styleOverrides: {
              root: {
                color: common.white,
                alignItems: "stretch",
                fontFamily:
                  "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
              },
            },
          },
          MuiAccordion: {
            styleOverrides: {
              root: {
                color: common.white,
                fontFamily:
                  "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
              },
            },
          },
        }
      : {
          MuiAppBar: {
            styleOverrides: {
              colorPrimary: {
                backgroundColor: blue[800],
              },
            },
          },
        }),
  },
});
