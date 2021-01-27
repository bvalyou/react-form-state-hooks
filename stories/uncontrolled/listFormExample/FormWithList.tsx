import { Button, FormControlLabel, Grid, Switch, TextField } from '@material-ui/core';
import React from 'react';
import { ListMerge, useFormState } from 'react-form-state-hooks/uncontrolled';
import useStyles from '../basicFormExample/BasicForm.styles';
import myService from '../basicFormExample/myService';
import { MyFormData, MyFormProps } from './FormWithList.types';
import PhoneSection from './PhoneSection';

const MyForm = ({ service = myService }: MyFormProps): React.ReactElement => {
	const classes = useStyles();
	const { getData, merge, onChange, onSubmit } = useFormState<MyFormData>({
		initialData: {
			firstName: '',
			lastName: '',
		},
		submit: service,
	});

	return (
		<form onSubmit={onSubmit}>
			<Grid container>
				<Grid item sm={12} md={4}>
					<TextField
						label="First Name"
						name="firstName"
						id="firstName"
						defaultValue={getData().firstName}
						onChange={onChange}
						classes={{ root: classes.input }}
					/>
				</Grid>

				<Grid item sm={12} md={4}>
					<TextField
						label="Last Name"
						name="lastName"
						id="lastName"
						defaultValue={getData().lastName}
						onChange={onChange}
						classes={{ root: classes.input }}
					/>
				</Grid>

				<Grid item sm={12} md={4}>
					<FormControlLabel
						control={
							<Switch defaultChecked={getData().isHuman} onChange={onChange} name="isHuman" />
						}
						label="Are you a human?"
					/>
				</Grid>

				<Grid item sm={12}>
					<PhoneSection
						name="phoneNumber"
						initialData={getData().phoneNumber}
						merge={merge as ListMerge}
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
