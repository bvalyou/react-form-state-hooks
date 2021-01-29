import { FormControl, FormLabel, Grid, TextField } from '@material-ui/core';
import React from 'react';
import { useFormState } from 'react-form-state-hooks/uncontrolled';
import type { PhoneNumber } from './BasicForm';
import useStyles from './BasicForm.styles';
import phoneCountryCodes from './phoneCountryCodes';
import type { PhoneSectionProps } from './PhoneSection.types';

const PhoneSection = ({
	name,
	initialData,
	merge: mergeProp,
}: PhoneSectionProps): React.ReactElement => {
	const classes = useStyles();
	const { getData, onChange } = useFormState<PhoneNumber>({
		name,
		initialData,
		merge: mergeProp,
	});

	return (
		<FormControl component="fieldset" classes={{ root: classes.fieldset }}>
			<FormLabel component="legend">Phone Number</FormLabel>

			<Grid container>
				<Grid sm={12} md={6}>
					<TextField
						select
						label="Country Code"
						name="countryCode"
						defaultValue={getData().countryCode}
						onChange={onChange}
						classes={{ root: classes.input }}
					>
						{phoneCountryCodes.map((option) => (
							<option key={option} value={option}>
								{option}
							</option>
						))}
					</TextField>
				</Grid>

				<Grid sm={12} md={6}>
					<TextField
						label="Number"
						name="number"
						defaultValue={getData().number}
						onChange={onChange}
						classes={{ root: classes.input }}
					/>
				</Grid>
			</Grid>
		</FormControl>
	);
};

export default PhoneSection;
