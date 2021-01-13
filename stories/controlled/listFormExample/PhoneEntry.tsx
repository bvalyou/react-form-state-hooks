import { Button, FormControl, FormLabel, Grid, TextField } from '@material-ui/core';
import React, { useCallback } from 'react';
import { createOnChange, useFormState } from 'react-form-state-hooks/controlled';
import useStyles from '../basicFormExample/BasicForm.styles';
import phoneCountryCodes from '../basicFormExample/phoneCountryCodes';
import { PhoneEntryProps } from './PhoneEntry.types';

const PhoneEntry = ({
	name,
	data: dataProp,
	updateData: updateDataProp,
	removeEntry,
}: PhoneEntryProps): React.ReactElement => {
	const classes = useStyles();
	const { data, updateData } = useFormState({ name, data: dataProp, updateData: updateDataProp });
	const onChange = useCallback(createOnChange(updateData), [updateData]);

	return (
		<FormControl component="fieldset" classes={{ root: classes.fieldset }}>
			<FormLabel component="legend">Phone Number</FormLabel>

			<Grid container>
				<Grid sm={12} md={4}>
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

				<Grid sm={12} md={5}>
					<TextField
						label="Number"
						name="number"
						value={data.number}
						onChange={onChange}
						classes={{ root: classes.input }}
					/>
				</Grid>

				<Grid sm={12} md={3}>
					<Button type="button" onClick={() => removeEntry(name)}>
						-
					</Button>
				</Grid>
			</Grid>
		</FormControl>
	);
};

export default PhoneEntry;
