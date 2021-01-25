import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import useFormState from '../useFormState';
import { FormState } from '../useFormState.types';
import useListFormState from '../useListFormState';
import { ListFormState } from '../useListFormState.types';
import connectFormStateInput from './connectFormStateInput';
import FormStateContext from './FormStateContext';

describe('connectFormStateInput', () => {
	it('should pass through if the FormStateContext value is null', () => {
		let name = undefined;
		let value = undefined;

		const onChange = jest.fn((event) => {
			({
				target: { name, value },
			} = event);
		});

		const Input = connectFormStateInput('input');

		const { getByLabelText } = render(
			<>
				<label htmlFor="foo">Foo</label>
				<Input id="foo" name="foo" onChange={onChange} />
			</>
		);

		fireEvent.change(getByLabelText('Foo'), { target: { value: 'bar' } });

		// stand-in for 'onChange to have been called' due to the impermanence of synthetic events
		expect(name).toBe('foo');
		expect(value).toBe('bar');

		expect(onChange).toHaveBeenCalledTimes(1);
	});

	it('should connect the form control to the FormStateContext value populated by useFormState', () => {
		const Input = connectFormStateInput('input');
		let formValue = null;

		function MyForm() {
			formValue = useFormState();

			return (
				<FormStateContext.Provider value={formValue}>
					<label htmlFor="foo">Foo</label>
					<Input id="foo" name="foo" />
				</FormStateContext.Provider>
			);
		}

		const { getByLabelText } = render(<MyForm />);

		formValue = (formValue as unknown) as FormState;

		expect(formValue.getData()).toEqual({});

		fireEvent.change(getByLabelText('Foo'), { target: { value: 'bar' } });

		expect(formValue.getData()).toEqual({ foo: 'bar' });
	});

	it('should connect the form control to the FormStateContext value populated by useListFormState', () => {
		const Input = connectFormStateInput('input');
		let formValue = null;

		function MyForm() {
			formValue = useListFormState({ initialData: [''] });

			return (
				<FormStateContext.Provider value={formValue as ListFormState}>
					{formValue.entries.map(({ name, key }) => (
						<React.Fragment key={key}>
							<label htmlFor={name}>Foo</label>
							<Input id={name} name={name} />
						</React.Fragment>
					))}
				</FormStateContext.Provider>
			);
		}

		const { getByLabelText } = render(<MyForm />);

		formValue = (formValue as unknown) as ListFormState;

		expect(formValue.getData().data).toEqual(['']);

		fireEvent.change(getByLabelText('Foo'), { target: { value: 'bar' } });

		expect(formValue.getData().data).toEqual(['bar']);
	});

	it('should derive the proper `checked` prop from formState', () => {
		const Input = connectFormStateInput('input');
		let formValue = null;

		function MyForm() {
			formValue = useFormState();

			return (
				<FormStateContext.Provider value={formValue}>
					<label htmlFor="foo">Foo</label>
					<Input id="foo" name="foo" type="checkbox" />
				</FormStateContext.Provider>
			);
		}

		const { getByLabelText } = render(<MyForm />);

		formValue = (formValue as unknown) as FormState;

		expect(formValue.getData()).toEqual({});

		fireEvent.click(getByLabelText('Foo'));

		// as mentioned in the createOnChange tests, this is default browser behavior
		expect(formValue.getData()).toEqual({ foo: 'on' });
		expect((getByLabelText('Foo') as HTMLInputElement).checked).toBe(true);
	});
});
