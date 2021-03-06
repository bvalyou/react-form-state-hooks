import { Button, Grid } from '@material-ui/core';
import React from 'react';
import { useFormState } from 'react-form-state-hooks/uncontrolled';
import { FormStateContext } from 'react-form-state-hooks/uncontrolled/context';
import type { MyFormData } from './ContextForm.types';
import useStyles from '../basicFormExample/BasicForm.styles';
import myService from '../basicFormExample/myService';
import Input from './Input';
import PhoneSection from './PhoneSection';

const ContextForm = (): React.ReactElement => {
	const classes = useStyles();
	const value = useFormState<MyFormData>({ submit: myService });

	return (
		<FormStateContext.Provider value={value}>
			<form onSubmit={value.onSubmit}>
				<Grid container>
					<Grid item sm={12} md={6}>
						<Input label="First Name" name="firstName" classes={{ root: classes.input }} />
					</Grid>

					<Grid item sm={12} md={6}>
						<Input label="Last Name" name="lastName" classes={{ root: classes.input }} />
					</Grid>

					<Grid item sm={12}>
						<PhoneSection />
					</Grid>

					<Grid item sm={12}>
						<Button type="submit">Send it!</Button>
					</Grid>
				</Grid>
			</form>
		</FormStateContext.Provider>
	);
};

export default ContextForm;
