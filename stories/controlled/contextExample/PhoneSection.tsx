import { Button } from '@material-ui/core';
import React, { useContext } from 'react';
import { useListFormState } from 'react-form-state-hooks/controlled';
import { FormStateContext } from 'react-form-state-hooks/controlled/context';
import { ListData } from 'react-form-state-hooks/controlled/list/useListFormState.types';
import { FormState } from 'react-form-state-hooks/controlled/useFormState.types';
import PhoneEntry from './PhoneEntry';
import { PhoneSectionProps } from './PhoneSection.types';

const PhoneSection = ({ name }: PhoneSectionProps): React.ReactElement => {
	const formState = (useContext(FormStateContext) as unknown) as FormState;
	const listFormState = useListFormState({
		name,
		data: formState.data?.[name] as ListData,
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
