import { FormControl, FormLabel, Grid, TextField } from '@material-ui/core';
import React, { useCallback } from 'react';
import { createOnChange, useFormState } from 'react-form-state-hooks/controlled';
import useStyles from './BasicForm.styles';
import phoneCountryCodes from './phoneCountryCodes';
import type { PhoneSectionProps } from './PhoneSection.types';

const PhoneSection = ({
	name,
	data: dataProp,
	updateData: updateDataProp,
}: PhoneSectionProps): React.ReactElement => {
	const classes = useStyles();
	const { data, updateData } = useFormState({ name, data: dataProp, updateData: updateDataProp });
	const onChange = useCallback(createOnChange(updateData), [updateData]);

	return (
		<FormControl component="fieldset" classes={{ root: classes.fieldset }}>
			<FormLabel component="legend">Phone Number</FormLabel>

			<Grid container>
				<Grid sm={12} md={6}>
					<TextField
						select
						label="Country Code"
						name="countryCode"
						value={data.countryCode}
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
						value={data.number}
						onChange={onChange}
						classes={{ root: classes.input }}
					/>
				</Grid>
			</Grid>
		</FormControl>
	);
};

export default PhoneSection;
