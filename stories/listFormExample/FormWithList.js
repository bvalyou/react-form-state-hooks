import React, { useCallback } from 'react';
import { useFormState, createOnChange } from 'react-form-state-hooks';
import { Button, Grid, TextField } from '@material-ui/core';
import myService from '../basicFormExample/myService';
import PhoneSection from './PhoneSection';
import useStyles from '../basicFormExample/BasicForm.styles';

const MyForm = () => {
	const classes = useStyles();
	const { data, updateData } = useFormState();
	const onChange = useCallback(createOnChange(updateData), [updateData]);

	const onSubmit = (event) => {
		event.preventDefault();

		myService(data);
	};

	return (
		<form onSubmit={onSubmit} className={classes.root}>
			<Grid container>
				<Grid sm={12} md={6}>
					<TextField
						label="First Name"
						name="firstName"
						value={data.firstName}
						onChange={onChange}
						classes={{ root: classes.input }}
					/>
				</Grid>

				<Grid sm={12} md={6}>
					<TextField
						label="Last Name"
						name="lastName"
						value={data.lastName}
						onChange={onChange}
						classes={{ root: classes.input }}
					/>
				</Grid>

				<Grid sm={12}>
					<PhoneSection name="phoneNumber" data={data.phoneNumber} updateData={updateData} />
				</Grid>

				<Grid sm={12}>
					<Button type="submit">Send it!</Button>
				</Grid>
			</Grid>
		</form>
	);
};

export default MyForm;
