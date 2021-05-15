import React from "react";
import { v4 as uuid } from "uuid";
import Container from "@material-ui/core/Container";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";

const RecipeStats = ({ upvoteCount, prepTime, cookTime, servings }) => {
	let totalTime = "";
	(prepTime && cookTime)
		? totalTime = Number(prepTime) + Number(cookTime)
		: totalTime = "?";

	if (!servings) {
		servings = "?";
	}

	if (!upvoteCount) {
		upvoteCount = 0;
	}

	const stats = [
		{ value: upvoteCount, tooltipText: "Upvotes", icon: "thumb_up" },
		{ value: totalTime, tooltipText: "Prep time + cook time", icon: "schedule" },
		{ value: servings, tooltipText: "Servings", icon: "people" }
	];

	return (
		<Container
			style={{
				display: "flex",
				alignSelf: "flex-end",
				justifyContent: "space-around",
				padding: "1% 5%",
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

export default RecipeStats;

