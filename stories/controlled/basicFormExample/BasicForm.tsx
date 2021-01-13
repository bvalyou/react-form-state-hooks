import React, { useCallback } from 'react';
import { useFormState, createOnChange } from 'react-form-state-hooks/controlled';
import { Button, Grid, TextField } from '@material-ui/core';
import myService from './myService';
import PhoneSection from './PhoneSection';
import useStyles from './BasicForm.styles';
import { Data } from 'react-form-state-hooks/controlled/useFormState.types';

const MyForm = (): React.ReactElement => {
	const classes = useStyles();
	const { data, updateData } = useFormState();
	const onChange = useCallback(createOnChange(updateData), [updateData]);

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
					<PhoneSection
						name="phoneNumber"
						data={(data.phoneNumber as unknown) as Data}
						updateData={updateData}
					/>
				</Grid>

				<Grid sm={12}>
					<Button type="submit">Send it!</Button>
				</Grid>
			</Grid>
		</form>
	);
};

export default MyForm;
