import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingIndicator = () => (
	<CircularProgress
		style={{ position: 'absolute', top: '50%', left: '50%' }}
	/>
);

export default LoadingIndicator;
