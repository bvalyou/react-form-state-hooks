import { Button } from '@material-ui/core';
import React from 'react';
import { useListFormState } from 'react-form-state-hooks/uncontrolled';
import type { Data } from 'react-form-state-hooks/uncontrolled/useFormState.types';
import type { PhoneNumber, PhoneSectionProps } from './FormWithList.types';
import PhoneEntry from './PhoneEntry';

const PhoneSection = ({
	name,
	initialData,
	merge: mergeProp,
}: PhoneSectionProps): React.ReactElement => {
	const { entries, addEntry, removeEntry, merge } = useListFormState<PhoneNumber>({
		name,
		initialData,
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
