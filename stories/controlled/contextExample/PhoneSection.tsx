import { Button } from '@material-ui/core';
import React, { useContext } from 'react';
import type { ListFormState } from 'react-form-state-hooks/controlled';
import { useListFormState } from 'react-form-state-hooks/controlled';
import { FormStateContext } from 'react-form-state-hooks/controlled/context';
import type { FormState } from 'react-form-state-hooks/controlled/useFormState.types';
import type { MyFormData } from './ContextForm';
import PhoneEntry from './PhoneEntry';
import type { PhoneNumber } from './PhoneEntry.types';

const PhoneSection = (): React.ReactElement => {
	const formState = (useContext(FormStateContext) as unknown) as FormState<MyFormData>;
	const listFormState = useListFormState<PhoneNumber>({
		name: 'phoneNumber',
		data: formState.data.phoneNumber,
		updateData: formState.updateData,
	});

	const { entries, addEntry } = listFormState;

	return (
		<FormStateContext.Provider value={listFormState as ListFormState}>
			{entries.map(({ key, name }) => (
				<PhoneEntry key={key} name={name} />
			))}
			<Button onClick={() => addEntry({})}>+</Button>
		</FormStateContext.Provider>
	);
};

export default PhoneSection;
