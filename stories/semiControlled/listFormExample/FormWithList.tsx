import { Button, Grid, TextField } from '@material-ui/core';
import React, { useCallback } from 'react';
import { createOnChange, useFormState } from 'react-form-state-hooks/semiControlled';
import type { Data } from 'react-form-state-hooks/semiControlled/useFormState.types';
import type { ListData } from 'react-form-state-hooks/semiControlled/useListFormState.types';
import useStyles from '../basicFormExample/BasicForm.styles';
import myService from '../basicFormExample/myService';
import PhoneSection from './PhoneSection';

const MyForm = (): React.ReactElement => {
	const classes = useStyles();
	const { getData, merge, onSubmit } = useFormState({ submit: myService });
	const onChange = useCallback(createOnChange(merge), [merge]);

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
					<PhoneSection
						name="phoneNumber"
						initialData={getData().phoneNumber as ListData<Data>}
						merge={merge}
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
