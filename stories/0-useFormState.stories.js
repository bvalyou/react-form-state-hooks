import React, { useCallback } from 'react';
import { useFormState } from 'react-form-state-hooks';
import { action } from '@storybook/addon-actions';
import createOnChange from '../src/createOnChange';

export default {
	title: 'useFormState',
};

export const BasicForm = () => {
	const { data, updateData } = useFormState({ initialData: { foo: 'bar' } });
	const onChange = useCallback(createOnChange(updateData), [updateData]);

	return (
		<form
			onSubmit={(event) => {
				event.preventDefault();

				action('submit')(data);
			}}
		>
			<label htmlFor="foo" style={{ display: 'block' }}>
				Foo
			</label>
			<input
				id="foo"
				name="foo"
				value={data.foo}
				onChange={({ target: { value } }) => updateData('foo', value)}
			/>

			<label htmlFor="bar" style={{ display: 'block', marginTop: 10 }}>
				Bar
			</label>
			<input id="bar" name="bar" value={data.bar} onChange={onChange} />

			<button type="submit" style={{ display: 'block', marginTop: 10 }}>
				Save
			</button>
		</form>
	);
};
