import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';

const useStyles = makeStyles({
	timelineContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '5% 1%',
		backgroundColor: '#FFF',
		borderRadius: '3px',
		boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
	},
});

const TimelineSidebar = ({ step }) => {
	const classes = useStyles();

	return (
		<Container className={classes.timelineContainer}>
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
