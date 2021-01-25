import { Button, FormControlLabel, Grid, Switch, TextField } from '@material-ui/core';
import React, { useCallback } from 'react';
import { createOnChange, useFormState } from 'react-form-state-hooks/controlled';
import type { ListData } from 'react-form-state-hooks/utils/listFormData.types';
import type { Data } from 'react-form-state-hooks/controlled/useFormState.types';
import useStyles from '../basicFormExample/BasicForm.styles';
import myService from '../basicFormExample/myService';
import PhoneSection from './PhoneSection';

export interface PhoneNumber {
	countryCode?: string;
	number?: string;
}

interface MyFormData {
	firstName?: string;
	lastName?: string;
	isHuman?: boolean;
	phoneNumber?: PhoneNumber[];
}

interface MyFormProps {
	service: (data: Data) => void;
}

const MyForm = ({ service = myService }: MyFormProps): React.ReactElement => {
	const classes = useStyles();
	const { data, updateData } = useFormState<MyFormData>({
		initialData: {
			firstName: '',
			lastName: '',
		},
	});
	const onChange = useCallback(createOnChange(updateData), [updateData]);

	const onSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		service(data);
	};

	return (
		<form onSubmit={onSubmit}>
			<Grid container>
				<Grid item sm={12} md={4}>
					<TextField
						label="First Name"
						name="firstName"
						id="firstName"
						value={data.firstName}
						onChange={onChange}
						classes={{ root: classes.input }}
					/>
				</Grid>

				<Grid item sm={12} md={4}>
					<TextField
						label="Last Name"
						name="lastName"
						id="lastName"
						value={data.lastName}
						onChange={onChange}
						classes={{ root: classes.input }}
					/>
				</Grid>

				<Grid item sm={12} md={4}>
					<FormControlLabel
						control={<Switch checked={data.isHuman} onChange={onChange} name="isHuman" />}
						label="Are you a human?"
					/>
				</Grid>

				<Grid item sm={12}>
					<PhoneSection
						name="phoneNumber"
						data={data.phoneNumber as ListData<Data>}
						updateData={updateData}
					/>
				</Grid>

				<Grid item sm={12}>
					<Button type="submit">Send it!</Button>
				</Grid>
			</Grid>
		</form>
	);
};

export default MyForm;
