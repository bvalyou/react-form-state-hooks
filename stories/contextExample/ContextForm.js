import { Button, Grid } from '@material-ui/core';
import React from 'react';
import { useFormState } from 'react-form-state-hooks';
import { FormStateContext } from 'react-form-state-hooks/context';
import myService from '../basicFormExample/myService';
import useStyles from '../basicFormExample/BasicForm.styles';
import Input from './Input';
import PhoneSection from './PhoneSection';

const onSubmit = ({ data }) => (event) => {
	event.preventDefault();

	myService(data);
};

const ContextForm = () => {
	const classes = useStyles();
	const value = useFormState();

	return (
		<FormStateContext.Provider value={value}>
			<form onSubmit={onSubmit(value)}>
				<Grid container>
					<Grid sm={12} md={6}>
						<Input label="First Name" name="firstName" classes={{ root: classes.input }} />
					</Grid>

					<Grid sm={12} md={6}>
						<Input label="Last Name" name="lastName" classes={{ root: classes.input }} />
					</Grid>

					<Grid sm={12}>
						<PhoneSection name="phoneNumber" />
					</Grid>

					<Grid sm={12}>
						<Button type="submit">Send it!</Button>
					</Grid>
				</Grid>
			</form>
		</FormStateContext.Provider>
	);
};

export default ContextForm;