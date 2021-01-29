import { Button, FormControl, FormLabel, Grid } from '@material-ui/core';
import React, { useContext } from 'react';
import type { Merge } from 'react-form-state-hooks/uncontrolled';
import { useFormState } from 'react-form-state-hooks/uncontrolled';
import { FormStateContext } from 'react-form-state-hooks/uncontrolled/context';
import type { Data } from 'react-form-state-hooks/uncontrolled/useFormState.types';
import type { ListFormState } from 'react-form-state-hooks/uncontrolled/useListFormState.types';
import useStyles from '../basicFormExample/BasicForm.styles';
import phoneCountryCodes from '../basicFormExample/phoneCountryCodes';
import Input from './Input';
import type { PhoneEntryProps } from './PhoneEntry.types';

const PhoneEntry = ({ name }: PhoneEntryProps): React.ReactElement => {
	const formState = (useContext(FormStateContext) as unknown) as ListFormState;
	const classes = useStyles();

	return (
		<FormStateContext.Provider
			value={useFormState({
				name,
				initialData: formState.getData().formData[name] as Data,
				merge: formState.merge as Merge,
			})}
		>
			<FormControl component="fieldset" classes={{ root: classes.fieldset }}>
				<FormLabel component="legend">Phone Number</FormLabel>

				<Grid container>
					<Grid sm={12} md={4}>
						<Input select label="Country Code" name="countryCode" classes={{ root: classes.input }}>
							{phoneCountryCodes.map((option) => (
								<option key={option} value={option}>
									{option}
								</option>
							))}
						</Input>
					</Grid>

					<Grid sm={12} md={5}>
						<Input label="Number" name="number" classes={{ root: classes.input }} />
					</Grid>

					<Grid sm={12} md={3}>
						<Button type="button" onClick={() => formState.removeEntry(name)}>
							-
						</Button>
					</Grid>
				</Grid>
			</FormControl>
		</FormStateContext.Provider>
	);
};

export default PhoneEntry;
