import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@mui/lab';
import { Container } from '@mui/material';
import React from 'react';

const TimelineSidebar = ({ step }) => {
	const styles = {
		timelineContainer: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			padding: '5% 1%',
			backgroundColor: '#FFF',
			borderRadius: '3px',
			boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
		}
	};

	return (
		<Container sx={styles.timelineContainer}>
			<Timeline>
				<TimelineItem>
					<TimelineSeparator>
						<TimelineDot
							color={step >= 1 ? 'secondary' : 'grey'}
							variant="outlined"
						/>
						<TimelineConnector />
					</TimelineSeparator>
					<TimelineContent>Step 1</TimelineContent>
				</TimelineItem>
				<TimelineItem>
					<TimelineSeparator>
						<TimelineDot
							color={step >= 2 ? 'secondary' : 'grey'}
							variant="outlined"
						/>
						<TimelineConnector />
					</TimelineSeparator>
					<TimelineContent>Step 2</TimelineContent>
				</TimelineItem>
				<TimelineItem>
					<TimelineSeparator>
						<TimelineDot
							color={step >= 3 ? 'secondary' : 'grey'}
							variant="outlined"
						/>
						<TimelineConnector />
					</TimelineSeparator>
					<TimelineContent>Step 3</TimelineContent>
				</TimelineItem>
				<TimelineItem>
					<TimelineSeparator>
						<TimelineDot
							color={step >= 4 ? 'secondary' : 'grey'}
							variant="outlined"
						/>
						<TimelineConnector />
					</TimelineSeparator>
					<TimelineContent>Step 4</TimelineContent>
				</TimelineItem>
			</Timeline>
		</Container>
	);
};

export default TimelineSidebar;
