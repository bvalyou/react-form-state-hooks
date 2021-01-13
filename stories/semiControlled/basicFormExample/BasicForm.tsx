import React, { useCallback } from 'react';
import { useFormState, createOnChange } from 'react-form-state-hooks/semiControlled';
import { Button, Grid, TextField } from '@material-ui/core';
import myService from './myService';
import PhoneSection from './PhoneSection';
import useStyles from './BasicForm.styles';

const MyForm = (): React.ReactElement => {
	const classes = useStyles();
	const { getData, merge } = useFormState();
	const onChange = useCallback(createOnChange(merge), [merge]);

	const onSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		myService(getData());
	};

	return (
		<form onSubmit={onSubmit}>
			<Grid container>
				<Grid sm={12} md={6}>
					<TextField
						label="First Name"
						name="firstName"
						defaultValue={getData().firstName}
						onChange={onChange}
						classes={{ root: classes.input }}
					/>
				</Grid>
				<Grid sm={12} md={6}>
					<TextField
						label="Last Name"
						name="lastName"
						defaultValue={getData().lastName}
						onChange={onChange}
						classes={{ root: classes.input }}
					/>
				</Grid>

				<Grid sm={12}>
					<PhoneSection name="phoneNumber" getData={getData} merge={merge} />
				</Grid>

				<Grid sm={12}>
					<Button type="submit">Send it!</Button>
				</Grid>
			</Grid>
		</form>
	);
};

export default MyForm;
