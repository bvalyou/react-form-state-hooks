import { Button, FormControl, FormLabel, Grid, TextField } from '@material-ui/core';
import React, { useRef } from 'react';
import type { Merge } from 'react-form-state-hooks/uncontrolled';
import { useFormState } from 'react-form-state-hooks/uncontrolled';
import useStyles from '../basicFormExample/BasicForm.styles';
import phoneCountryCodes from '../basicFormExample/phoneCountryCodes';
import type { PhoneEntryProps, PhoneNumber } from './FormWithList.types';

const PhoneEntry = ({
	name,
	initialValue,
	merge: mergeProp,
	removeEntry,
}: PhoneEntryProps): React.ReactElement => {
	const classes = useStyles();
	const { getData, onChange } = useFormState({
		name,
		initialData: initialValue,
		merge: mergeProp as Merge<PhoneNumber>,
	});
	const numberInputRef = useRef();

	return (
		<FormControl component="fieldset" classes={{ root: classes.fieldset }}>
			<FormLabel component="legend">Phone Number</FormLabel>

			<Grid container>
				<Grid sm={12} md={4}>
					<TextField
						select
						label="Country Code"
						name="countryCode"
						id={`${name}-countryCode`}
						value={getData().countryCode}
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
						id={`${name}-number`}
						value={getData().number}
						inputRef={numberInputRef}
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
