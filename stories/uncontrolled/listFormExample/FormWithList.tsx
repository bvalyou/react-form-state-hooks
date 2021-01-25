import { Button, Grid, TextField } from '@material-ui/core';
import React from 'react';
import { useFormState } from 'react-form-state-hooks/uncontrolled';
import useStyles from '../basicFormExample/BasicForm.styles';
import myService from '../basicFormExample/myService';
import { FormWithListData } from './FormWithList.types';
import PhoneSection from './PhoneSection';

const MyForm = (): React.ReactElement => {
	const classes = useStyles();
	const { getData, merge, onChange, onSubmit } = useFormState<FormWithListData>({
		submit: myService,
	});

	return (
		<form onSubmit={onSubmit}>
			<Grid container>
				<Grid sm={12} md={6}>
					<TextField
						label="First Name"
						name="firstName"
						value={getData().firstName}
						onChange={onChange}
						classes={{ root: classes.input }}
					/>
				</Grid>

				<Grid sm={12} md={6}>
					<TextField
						label="Last Name"
						name="lastName"
						value={getData().lastName}
						onChange={onChange}
						classes={{ root: classes.input }}
					/>
				</Grid>

				<Grid sm={12}>
					<PhoneSection name="phoneNumber" initialData={getData().phoneNumber} merge={merge} />
				</Grid>

				<Grid sm={12}>
					<Button type="submit">Send it!</Button>
				</Grid>
			</Grid>
		</form>
	);
};

export default MyForm;
