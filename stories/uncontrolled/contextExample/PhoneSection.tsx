import { Button } from '@material-ui/core';
import React, { useContext } from 'react';
import type { ListFormState, ListMerge } from 'react-form-state-hooks/uncontrolled';
import { useListFormState } from 'react-form-state-hooks/uncontrolled';
import { FormStateContext } from 'react-form-state-hooks/uncontrolled/context';
import type { FormState } from 'react-form-state-hooks/uncontrolled/useFormState.types';
import type { MyFormData } from './ContextForm';
import PhoneEntry from './PhoneEntry';

const PhoneSection = (): React.ReactElement => {
	const formState = (useContext(FormStateContext) as unknown) as FormState<MyFormData>;
	const listFormState = useListFormState({
		name: 'phoneNumber',
		initialData: formState.getData().phoneNumber,
		merge: formState.merge as ListMerge,
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
