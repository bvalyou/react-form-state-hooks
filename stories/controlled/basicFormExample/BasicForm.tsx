import { Button, Grid, TextField } from '@material-ui/core';
import React, { useCallback } from 'react';
import { createOnChange, useFormState } from 'react-form-state-hooks/controlled';
import useStyles from './BasicForm.styles';
import myService from './myService';
import PhoneSection from './PhoneSection';
import type { MyFormData } from './BasicForm.types';

const MyForm = (): React.ReactElement => {
	const classes = useStyles();
	const { data, updateData } = useFormState<MyFormData>();
	const onChange = useCallback((event) => createOnChange(updateData)(event), [updateData]);

	const onSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		myService(data);
	};

	return (
		<form onSubmit={onSubmit}>
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
