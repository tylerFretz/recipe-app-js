import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

const ToggleableList = ({ items, isNumbered }) => {
	const [checked, setChecked] = useState([]);

	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	return (
		<List style={{ width: '100%', marginBottom: '2%' }}>
			{items.map((value, index) => {
				const labelId = `checkbox-list-label-${value}`;
				const isChecked = checked.indexOf(value) !== -1;

				return (
					<ListItem
						key={value}
						role={undefined}
						dense
						onClick={handleToggle(value)}
						style={{
							textDecoration: isChecked ? 'line-through' : 'none',
						}}
					>
						<ListItemIcon style={{ alignSelf: 'flex-start' }}>
							<Checkbox
								edge="start"
								size="small"
								checked={isChecked}
								tabIndex={-1}
								disableRipple
							/>
						</ListItemIcon>
						{isNumbered ? (
							<ListItemText
								id={labelId}
								primary={`Step ${index + 1}`}
								secondary={value}
								primaryTypographyProps={{ variant: 'h6' }}
							/>
						) : (
							<ListItemText id={labelId} secondary={value} />
						)}
					</ListItem>
				);
			})}
		</List>
	);
};

export default ToggleableList;
