import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const LoadingIndicator = () => (
	<CircularProgress style={{ position: "absolute", top: "50%", left: "50%" }} />
);

export default LoadingIndicator;