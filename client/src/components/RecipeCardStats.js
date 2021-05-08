import React from "react";
import { v4 as uuid } from "uuid";
import Container from "@material-ui/core/Container";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";

const RecipeCardStats = ({ upvotes, prepTime, cookTime, servings }) => {

	if (!upvotes) {
		upvotes = 0;
	}

	if (!prepTime) {
		prepTime = 0;
	}

	if (!cookTime) {
		cookTime = 0;
	}

	if (!servings) {
		servings = 0;
	}


	const stats = [
		{ value: upvotes, tooltipText: "Upvotes", icon: "thumb_up" },
		{ value: Number(prepTime) + Number(cookTime), tooltipText: "Prep time + cook time", icon: "schedule" },
		{ value: servings, tooltipText: "Servings", icon: "people" }
	];

	return (
		<Container
			style={{
				display: "flex",
				alignSelf: "flex-end",
				justifyContent: "space-around",
				padding: "1% 5%",
				borderTop: "1px solid #eee",
			}}
		>
			{stats.map((item) => (
				<Tooltip key={uuid()} title={item.tooltipText}>
					<Container style={{ display: "flex", justifyContent: "space-around" }}>
						<Icon>{item.icon}</Icon>
						<Typography>{item.value}</Typography>
					</Container>
				</Tooltip>
			))}
		</Container>
	);
};

export default RecipeCardStats;

