import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import createOnChange from './createOnChange';

describe('createOnChange', () => {
	it('should call its updateData function with its input attributes', () => {
		const updateData = jest.fn();
		const onChange = createOnChange(updateData);
		const { getByLabelText } = render(
			<>
				<label htmlFor="foo">Foo</label>
				<input id="foo" name="foo" onChange={onChange} />
			</>
		);

		fireEvent.change(getByLabelText('Foo'), { target: { value: 'bar' } });

		expect(updateData).toHaveBeenCalledWith('foo', 'bar');
	});
});
