import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { TextField } from 'formik-material-ui';
import { Formik, Form, Field } from 'formik';

const useStyles = makeStyles((theme) => ({
	title: {
		marginBottom: '2%',
		fontSize: '1.5rem',
		fontWeight: 500
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const CommentForm = ({ handleAddComment }) => {
	const classes = useStyles();

	return (
		<Formik
			initialValues={{
				comment: ''
			}}
			onSubmit={(values, actions) => {
				handleAddComment(values.comment);
				actions.resetForm();
				actions.setSubmitting(false);
			}}
			validate={(values) => {
				const errors = {};
				if (!values.comment) errors.comment = 'Comment is required.';
				if (values.comment.length > 10000) errors.comment = 'Max comment length is 10000.';
				return errors;
			}}
		>
			{({ submitForm }) => (
				<Form style={{ paddingTop: '5%', borderTop: '1px solid rgba(0,0,0,.1)' }}>
					<Typography className={classes.title}>Leave a Reply</Typography>
					<Typography style={{ marginBottom: '4%', fontSize: '.9rem' }}>Must be logged in to comment*</Typography>
					<Field
						component={TextField}
						name='comment'
						label='Comment'
						variant="outlined"
						multiline={true}
						fullWidth
						rows={3}
					/>
					<Button
						className={classes.submit}
						variant='contained'
						color='secondary'
						onClick={submitForm}
					>
						Post Comment
					</Button>
				</Form>
			)}
		</Formik>
	);
};

export default CommentForm;