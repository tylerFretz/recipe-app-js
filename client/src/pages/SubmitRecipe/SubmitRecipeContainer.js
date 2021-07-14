import React, { useState } from 'react';
import { Formik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import Banner from '../../components/Banner';
import TimelineSidebar from './TimelineSidebar';
import SubmitRecipeForm from './SubmitRecipeForm';

const useStyles = makeStyles((theme) => ({
	mainContainer: {
		marginTop: '5%',
		display: 'flex',
		justifyContent: 'space-between',
		[theme.breakpoints.down('sm')]: {
			padding: '1% 1%',
		},
	},
	timelineContainer: {
		width: '20%',
		padding: 0,
		margin: 0,
		[theme.breakpoints.down('sm')]: {
			width: '25%',
		},
	},
	formContainer: {
		width: '75%',
		marginLeft: '5%',
		margin: '0%',
		padding: '3%',
		backgroundColor: '#FFF',
		borderRadius: '3px',
		boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
	},
	buttonContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '40%',
		margin: '3% 30%',
	},
	prevButton: {
		margin: '0% 5%',
		backgroundColor: theme.palette.primary.main,
		color: '#FFF',
		'&:hover': {
			backgroundColor: '#000',
		},
	},
	nextButton: {
		backgroundColor: theme.palette.secondary.main,
		color: '#FFF',
		'&:hover': {
			backgroundColor: '#000',
		},
	},
}));

const SubmitRecipeContainer = ({ initialValues, onSubmit, validationSchema }) => {
	const classes = useStyles();
	const [step, setStep] = useState(1);

	const handleNext = () => {
		if (step < 4) {
			setStep(step + 1);
		}
	};

	const handlePrev = () => {
		if (step > 1) {
			setStep(step - 1);
		}
	};

	const isDisabled = (errors) => {
		if (step === 1 && !errors.name && !errors.instructions) {
			return false;
		} else if (step === 2 && !errors.ingredients) {
			return false;
		} else {
			return Boolean(Object.entries(errors).length > 0);
		}
	};

	return (
		<>
			<Banner
				title="Submit Recipe"
				breadcrumbList={[{ title: 'Submit Recipe', path: 'submit' }]}
			/>
			<Container className={classes.mainContainer}>
				<Container className={classes.timelineContainer}>
					<TimelineSidebar step={step} />
				</Container>
				<Container className={classes.formContainer}>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={(values, actions) => {
							onSubmit(values);
							actions.setSubmitting(false);
						}}>
						{({ values, errors, touched }) => (
							<>
								<SubmitRecipeForm
									values={values}
									errors={errors}
									touched={touched}
									step={step}
								/>
								<Container className={classes.buttonContainer}>
									<Button
										onClick={() => handlePrev()}
										className={classes.prevButton}
									>
										Prev
									</Button>
									<Button
										onClick={() => handleNext()}
										className={classes.nextButton}
										disabled={isDisabled(errors)}
									>
										Next
									</Button>
								</Container>
								{errors && (
									<ul>
										{Object.keys(errors).map((err) => (
											<li key={err}>Add recipe {err} to continue.</li>
										))}
									</ul>
								)}
							</>
						)}
					</Formik>
				</Container>
			</Container>
		</>
	);
};

export default SubmitRecipeContainer;
