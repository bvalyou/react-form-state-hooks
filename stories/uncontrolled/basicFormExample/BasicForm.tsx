import { Button, Grid, TextField } from '@material-ui/core';
import React from 'react';
import { useFormState } from 'react-form-state-hooks/uncontrolled';
import useStyles from './BasicForm.styles';
import myService from './myService';
import PhoneSection from './PhoneSection';
import type { MyFormData } from './BasicForm.types';

const MyForm = (): React.ReactElement => {
	const classes = useStyles();
	const { getData, merge, onChange, onSubmit } = useFormState<MyFormData>({ submit: myService });

	return (
		<form onSubmit={onSubmit}>
			<Grid container>
				<Grid item sm={12} md={6}>
					<TextField
						label="First Name"
						name="firstName"
						defaultValue={getData().firstName}
						onChange={onChange}
						classes={{ root: classes.input }}
					/>
				</Grid>
				<Grid item sm={12} md={6}>
					<TextField
						label="Last Name"
						name="lastName"
						defaultValue={getData().lastName}
						onChange={onChange}
						classes={{ root: classes.input }}
					/>
				</Grid>

				<Grid item sm={12}>
					<PhoneSection name="phoneNumber" initialData={getData().phoneNumber} merge={merge} />
				</Grid>

				<Grid item sm={12}>
					<Button type="submit">Send it!</Button>
				</Grid>
			</Grid>
		</form>
	);
};

export default MyForm;
