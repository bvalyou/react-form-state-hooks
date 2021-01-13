import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import createOnChange from './createOnChange';

describe('createOnChange', () => {
	describe('for input', () => {
		it('should call merge on change with the change value when type is text', () => {
			const merge = jest.fn();
			const onChange = createOnChange(merge);
			const { getByLabelText } = render(
				<>
					<label htmlFor="foo">Foo</label>
					<input id="foo" name="foo" onChange={onChange} />
				</>
			);

			fireEvent.change(getByLabelText('Foo'), { target: { value: 'bar' } });

			expect(merge).toHaveBeenCalledWith({ foo: 'bar' });
			expect(merge).toHaveBeenCalledTimes(1);
		});

		// not sure if this is good or not, but it's default browser behavior, so left out 'should'
		it("calls merge when toggled on with 'on' if type is checkbox and no value is set", () => {
			const merge = jest.fn();
			const onChange = createOnChange(merge);
			const { getByLabelText } = render(
				<>
					<label htmlFor="foo">Foo</label>
					<input type="checkbox" id="foo" name="foo" onChange={onChange} />
				</>
			);

			fireEvent.click(getByLabelText('Foo'));

			expect(merge).toHaveBeenCalledWith({ foo: 'on' });
			expect(merge).toHaveBeenCalledTimes(1);
		});

		it('should call merge with its value when toggled on if type is checkbox and value is set', () => {
			const merge = jest.fn();
			const onChange = createOnChange(merge);
			const { getByLabelText } = render(
				<>
					<label htmlFor="foo">Foo</label>
					<input type="checkbox" id="foo" name="foo" value="yes" onChange={onChange} />
				</>
			);

			fireEvent.click(getByLabelText('Foo'));

			expect(merge).toHaveBeenCalledWith({ foo: 'yes' });
			expect(merge).toHaveBeenCalledTimes(1);
		});

		it('should call merge with false when toggled off if type is checkbox and value is not set', () => {
			const merge = jest.fn();
			const onChange = createOnChange(merge);
			const { getByLabelText } = render(
				<>
					<label htmlFor="foo">Foo</label>
					<input type="checkbox" id="foo" name="foo" checked onChange={onChange} />
				</>
			);

			fireEvent.click(getByLabelText('Foo'));

			expect(merge).toHaveBeenCalledWith({ foo: false });
			expect(merge).toHaveBeenCalledTimes(1);
		});

		it('should call merge with false when toggled off if type is checkbox and value is set', () => {
			const merge = jest.fn();
			const onChange = createOnChange(merge);
			const { getByLabelText } = render(
				<>
					<label htmlFor="foo">Foo</label>
					<input type="checkbox" id="foo" name="foo" checked value="yes" onChange={onChange} />
				</>
			);

			fireEvent.click(getByLabelText('Foo'));

			expect(merge).toHaveBeenCalledWith({ foo: false });
			expect(merge).toHaveBeenCalledTimes(1);
		});

		it('should call merge with the selected value from a radio group', () => {
			const merge = jest.fn();
			const onChange = createOnChange(merge);
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

			expect(merge).toHaveBeenCalledWith({ foo: 'bar' });
			expect(merge).toHaveBeenCalledTimes(1);
		});
	});

	it("should call merge with the selected option's value if set when selected", () => {
		const merge = jest.fn();
		const onChange = createOnChange(merge);
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

		expect(merge).toHaveBeenCalledWith({ foo: 'baz' });
		expect(merge).toHaveBeenCalledTimes(1);
	});
});
