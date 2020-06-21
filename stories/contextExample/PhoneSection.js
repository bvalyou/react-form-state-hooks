import { Button } from '@material-ui/core';
import React, { useContext } from 'react';
import { useListFormState } from 'react-form-state-hooks';
import { FormStateContext } from 'react-form-state-hooks/context';
import PhoneEntry from './PhoneEntry';

const PhoneSection = ({ name }) => {
	const formState = useContext(FormStateContext);
	const listFormState = useListFormState({
		name,
		data: formState.data?.[name],
		updateData: formState.updateData,
	});

	const { entries, addEntry } = listFormState;

	return (
		<FormStateContext.Provider value={listFormState}>
			{entries.map(({ key, name }) => (
				<PhoneEntry key={key} name={name} />
			))}
			<Button onClick={() => addEntry({})}>+</Button>
		</FormStateContext.Provider>
	);
};

export default PhoneSection;