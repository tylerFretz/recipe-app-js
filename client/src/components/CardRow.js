import React from "react";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Grid from "@material-ui/core/Grid";

import MetaCard from "./MetaCard";
import RecipeCard from "./RecipeCard";

const CardRow = ({ items, type }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	return type === "recipes"
		? (
			<Grid container spacing={3} style={{ flexDirection: isMobile ? "column" : "row" }}>
				{items.map(recipe => (
					<Grid container item xs={isMobile ? 12 : 4} key={recipe.id} style={{ justifyContent: "center" }}>
						<RecipeCard recipe={recipe} />
					</Grid>
				))}
			</Grid>
		) : (
			<Grid container spacing={3} style={{ flexDirection: isMobile ? "column" : "row" }}>
				{items.map((item, i) => (
					<Grid container item xs={isMobile ? 12 : 4} key={i} style={{ justifyContent: "center" }}>
						<MetaCard title={item} type={type} />
					</Grid>
				))}
			</Grid>
		);
};

export default CardRow;