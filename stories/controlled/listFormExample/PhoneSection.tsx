import { Button } from '@material-ui/core';
import React from 'react';
import { useListFormState } from 'react-form-state-hooks/controlled';
import PhoneEntry from './PhoneEntry';
import { PhoneSectionProps } from './PhoneSection.types';
import { Data } from 'react-form-state-hooks/controlled/useFormState.types';

const PhoneSection = ({
	name,
	data: dataProp,
	updateData: updateDataProp,
}: PhoneSectionProps): React.ReactElement => {
	const { entries, addEntry, removeEntry, updateData } = useListFormState({
		name,
		data: dataProp,
		updateData: updateDataProp,
	});

	return (
		<>
			{entries.map(({ key, name, value }) => {
				return (
					<PhoneEntry
						updateData={updateData}
						data={value as Data}
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
