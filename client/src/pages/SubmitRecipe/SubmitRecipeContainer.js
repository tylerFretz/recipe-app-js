import { Button, Container, useTheme } from '@mui/material';
import { Formik } from 'formik';
import React, { useState } from 'react';
import Banner from '../../components/Banner';
import SubmitRecipeForm from './SubmitRecipeForm';
import TimelineSidebar from './TimelineSidebar';

const SubmitRecipeContainer = ({ initialValues, onSubmit, validationSchema }) => {
	const theme = useTheme();
	const [step, setStep] = useState(1);

	const styles = {
		mainContainer: {
			marginTop: '5%',
			display: 'flex',
			justifyContent: 'space-between',
			[theme.breakpoints.down('md')]: {
				padding: '1% 1%',
			},
		},
		timelineContainer: {
			width: '20%',
			padding: 0,
			margin: 0,
			[theme.breakpoints.down('md')]: {
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
	};

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
			<Container sx={styles.mainContainer}>
				<Container sx={styles.timelineContainer}>
					<TimelineSidebar step={step} />
				</Container>
				<Container sx={styles.formContainer}>
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
								<Container sx={styles.buttonContainer}>
									<Button
										onClick={() => handlePrev()}
										sx={styles.prevButton}
									>
										Prev
									</Button>
									<Button
										onClick={() => handleNext()}
										sx={styles.nextButton}
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
