import { action } from '@storybook/addon-actions';
import React, { useCallback } from 'react';
import { useListFormState } from 'react-form-state-hooks';
import createOnChange from '../src/createOnChange';

export default {
	title: 'useListFormState',
};

export const BasicForm = () => {
	const { entries, data, updateData, addEntry, removeEntry } = useListFormState({
		name: 'foo',
		initialData: ['bar', 'baz'],
	});
	const onChange = useCallback(createOnChange(updateData), [updateData]);

	return (
		<form
			onSubmit={(event) => {
				event.preventDefault();
				action('submit')(data);
			}}
		>
			{entries.map(({ name, key, value }, index) => (
				<div key={key}>
					<label htmlFor={name}>Foo {index + 1}</label>
					<input id={name} name={name} value={value} onChange={onChange} />

					<button type="button" onClick={() => removeEntry(name)}>
						-
					</button>
				</div>
			))}
			<button type="button" onClick={() => addEntry('')} style={{ display: 'block' }}>
				+
			</button>

			<button type="submit">Save</button>
		</form>
	);
};
