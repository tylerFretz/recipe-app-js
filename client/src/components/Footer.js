import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
	footer: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
		backgroundColor: "#333333",
		color: "#FFF",
		minHeight: "5vh"
	},
	section: {
		display: "flex",
	},
	footerText: {
		margin: "0% 5%",
		variant: "body2"
	}
});

const Footer = () => {
	const classes = useStyles();

	return (
		<Container className={classes.footer} maxWidth={false}>
			<Container className={classes.section}>
				<Typography className={classes.footerText}>privacy policy</Typography>
				<Typography className={classes.footerText}>contact</Typography>
			</Container>
			<Container className={classes.section}>
				<Typography className={classes.footerText}>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></Typography>
				<Typography className={classes.footerText}>All rights reserved © Designed by tylerFretz</Typography>
			</Container>
		</Container>
	);
};

export default Footer;