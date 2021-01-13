import { Button } from '@material-ui/core';
import React from 'react';
import { useListFormState } from 'react-form-state-hooks/controlled';
import PhoneEntry from './PhoneEntry';

const PhoneSection = ({ name, data: dataProp, updateData: updateDataProp }) => {
	const { entries, addEntry, removeEntry, updateData } = useListFormState({
		name,
		data: dataProp,
		updateData: updateDataProp,
	});

	return (
		<>
			{entries.map(({ key, name, value }) => (
				<PhoneEntry
					updateData={updateData}
					data={value}
					name={name}
					key={key}
					removeEntry={removeEntry}
				/>
			))}
			<Button onClick={() => addEntry({})}>+</Button>
		</>
	);
};

export default PhoneSection;
