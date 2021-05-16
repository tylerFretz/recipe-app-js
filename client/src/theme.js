import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

const pxToRem = (value) => {
	return `${value / 16}rem`;
};

let theme = createMuiTheme({
	palette: {
		primary: {
			main:  "#333333"
		},
		secondary: {
			main: "#7AA93C",
			contrastText: "#333333"
		},
		darkGrey: {
			main: "#676767"
		},
		primarycta: {
			main: "#3B4332"
		},
	},
});

theme.props = {
	MuiButtonBase: {
		disableRipple: true
	},
};

theme.overrides = {
	MuiButton: {
		root: {
			boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)"
		}
	},
	MuiCard: {
		root: {
			marginTop: theme.spacing(1),
			maxWidth: "360px",
			borderRadius: "3px",
		}
	},
	MuiCardContent: {
		root: {
			padding: theme.spacing(1, 2),
		}
	},
	MuiCardMedia: {
		media: {
			alignSelf: "center",
			transition: "all 0.5s ease-in-out",
			overflow: "hidden",
			"&:hover": {
				transform: "scale(1.05, 1.05)"
			}
		}
	},
	MuiTypography: {
		h1: {
			[theme.breakpoints.down("sm")]: {
				fontSize: pxToRem(46)
			}
		},
		h6: {
			[theme.breakpoints.down("sm")]: {
				fontSize: pxToRem(14)
			}
		}
	}
};

theme = responsiveFontSizes(theme);

export default theme;