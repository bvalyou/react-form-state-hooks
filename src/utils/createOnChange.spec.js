import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import createOnChange from './createOnChange';

describe('createOnChange', () => {
	describe('for input', () => {
		it('should call updateData on change with the change value when type is text', () => {
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
			expect(updateData).toHaveBeenCalledTimes(1);
		});

		// not sure if this is good or not, but it's default browser behavior, so left out 'should'
		it("calls updateData when toggled on with 'on' if type is checkbox and no value is set", () => {
			const updateData = jest.fn();
			const onChange = createOnChange(updateData);
			const { getByLabelText } = render(
				<>
					<label htmlFor="foo">Foo</label>
					<input type="checkbox" id="foo" name="foo" onChange={onChange} />
				</>
			);

			fireEvent.click(getByLabelText('Foo'));

			expect(updateData).toHaveBeenCalledWith('foo', 'on');
			expect(updateData).toHaveBeenCalledTimes(1);
		});

		it('should call updateData with its value when toggled on if type is checkbox and value is set', () => {
			const updateData = jest.fn();
			const onChange = createOnChange(updateData);
			const { getByLabelText } = render(
				<>
					<label htmlFor="foo">Foo</label>
					<input type="checkbox" id="foo" name="foo" value="yes" onChange={onChange} />
				</>
			);

			fireEvent.click(getByLabelText('Foo'));

			expect(updateData).toHaveBeenCalledWith('foo', 'yes');
			expect(updateData).toHaveBeenCalledTimes(1);
		});

		it('should call updateData with false when toggled off if type is checkbox and value is not set', () => {
			const updateData = jest.fn();
			const onChange = createOnChange(updateData);
			const { getByLabelText } = render(
				<>
					<label htmlFor="foo">Foo</label>
					<input type="checkbox" id="foo" name="foo" checked onChange={onChange} />
				</>
			);

			fireEvent.click(getByLabelText('Foo'));

			expect(updateData).toHaveBeenCalledWith('foo', false);
			expect(updateData).toHaveBeenCalledTimes(1);
		});

		it('should call updateData with false when toggled off if type is checkbox and value is set', () => {
			const updateData = jest.fn();
			const onChange = createOnChange(updateData);
			const { getByLabelText } = render(
				<>
					<label htmlFor="foo">Foo</label>
					<input type="checkbox" id="foo" name="foo" checked value="yes" onChange={onChange} />
				</>
			);

			fireEvent.click(getByLabelText('Foo'));

			expect(updateData).toHaveBeenCalledWith('foo', false);
			expect(updateData).toHaveBeenCalledTimes(1);
		});

		it('should call updateData with the selected value from a radio group', () => {
			const updateData = jest.fn();
			const onChange = createOnChange(updateData);
			const { getByLabelText } = render(
				<fieldset>
					<legend>Test Radios</legend>

					{[
						['Bar', 'bar'],
						['Baz', 'baz'],
					].map(([label, value]) => (
						<React.Fragment key={value}>
							<label htmlFor={value}>{label}</label>
							<input type="radio" id={value} name="foo" value={value} onChange={onChange} />
						</React.Fragment>
					))}
				</fieldset>
			);

			fireEvent.click(getByLabelText('Bar'));

			expect(updateData).toHaveBeenCalledWith('foo', 'bar');
			expect(updateData).toHaveBeenCalledTimes(1);
		});
	});

	it("should call updateData with the selected option's value if set when selected", () => {
		const updateData = jest.fn();
		const onChange = createOnChange(updateData);
		const { getByLabelText } = render(
			<>
				<label htmlFor="foo">Foo</label>
				<select id="foo" name="foo" onChange={onChange}>
					<option>bar</option>
					<option value="baz">Baz</option>
				</select>
			</>
		);

		fireEvent.change(getByLabelText('Foo'), { target: { value: 'baz' } });

		expect(updateData).toHaveBeenCalledWith('foo', 'baz');
		expect(updateData).toHaveBeenCalledTimes(1);
	});
});
