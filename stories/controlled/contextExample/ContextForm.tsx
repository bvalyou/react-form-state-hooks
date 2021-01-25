import { Button, Grid } from '@material-ui/core';
import React from 'react';
import { useFormState } from 'react-form-state-hooks/controlled';
import { FormStateContext } from 'react-form-state-hooks/controlled/context';
import { FormState } from 'react-form-state-hooks/controlled/useFormState.types';
import useStyles from '../basicFormExample/BasicForm.styles';
import myService from '../basicFormExample/myService';
import Input from './Input';
import { PhoneNumber } from './PhoneEntry.types';
import PhoneSection from './PhoneSection';

const onSubmit = ({ data }: FormState) => (event: React.FormEvent) => {
	event.preventDefault();

	myService(data);
};

export interface MyFormData {
	firstName?: string;
	lastName?: string;
	isHuman?: boolean;
	phoneNumber?: PhoneNumber[];
}

const ContextForm = (): React.ReactElement => {
	const classes = useStyles();
	const value = useFormState<MyFormData>();

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
						<PhoneSection />
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
