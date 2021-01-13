import React, { useCallback } from 'react';
import { useFormState, createOnChange } from 'react-form-state-hooks/semiControlled';
import { FormControl, FormLabel, Grid, TextField } from '@material-ui/core';
import phoneCountryCodes from './phoneCountryCodes';
import useStyles from './BasicForm.styles';
import type { PhoneSectionProps } from './PhoneSection.types';

const PhoneSection = ({
	name,
	getData: getDataProp,
	merge: mergeProp,
}: PhoneSectionProps): React.ReactElement => {
	const classes = useStyles();
	const { getData, merge } = useFormState({ name, initialData: getDataProp(), merge: mergeProp });
	const onChange = useCallback(createOnChange(merge), [merge]);

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
