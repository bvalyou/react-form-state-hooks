import { Button } from '@material-ui/core';
import React from 'react';
import { useListFormState } from 'react-form-state-hooks/semiControlled';
import { Data } from 'react-form-state-hooks/semiControlled/useFormState.types';
import PhoneEntry from './PhoneEntry';
import { PhoneSectionProps } from './PhoneSection.types';

const PhoneSection = ({
	name,
	initialData: initialData,
	merge: mergeProp,
}: PhoneSectionProps): React.ReactElement => {
	const { entries, addEntry, removeEntry, merge } = useListFormState({
		name,
		initialData: initialData,
		merge: mergeProp,
	});

	return (
		<>
			{entries.map(({ key, name, initialValue }) => {
				return (
					<PhoneEntry
						merge={merge}
						initialValue={initialValue as Data}
						name={name}
						key={key}
						removeEntry={removeEntry}
					/>
				);
			})}
			<Button onClick={() => addEntry({})}>+</Button>
		</>
	);
};

export default PhoneSection;
