import { renderHook } from '@testing-library/react-hooks';
import type React from 'react';
import useFormState from './useFormState';

describe('useFormState', () => {
	it('should return initialData from getData in the initially', () => {
		const initialData = { foo: 'bar' };
		const { result } = renderHook(() => useFormState({ initialData }));

		expect(result.current.getData()).toEqual(initialData);
	});

	describe('merge', () => {
		it('should update data', () => {
			const { result } = renderHook(() => useFormState<Record<string, string>>());

			const initialValue = result.current;

			result.current.merge({ bar: 'baz' });

			expect(result.current).toBe(initialValue);
			expect(result.current.getData()).toEqual({
				bar: 'baz',
			});
		});

		it('should call the merge option with name', () => {
			const merge = jest.fn();
			const { result } = renderHook(() =>
				useFormState({ initialData: { foo: 'bar' }, merge, name: 'child' })
			);

			const initialValue = result.current;

			result.current.merge({ bar: 'baz' });

			expect(result.current).toBe(initialValue);
			expect(merge).toHaveBeenCalledWith({
				child: {
					foo: 'bar',
					bar: 'baz',
				},
			});
		});

		it('should call the merge option without name', () => {
			const merge = jest.fn();
			const { result } = renderHook(() => useFormState({ initialData: { foo: 'bar' }, merge }));

			const initialValue = result.current;

			result.current.merge({ bar: 'baz' });

			expect(result.current).toBe(initialValue);
			expect(merge).toHaveBeenCalledWith({
				foo: 'bar',
				bar: 'baz',
			});
		});
	});

	describe('reset', () => {
		it("should cause the context's data to reset", () => {
			const { result } = renderHook(() =>
				useFormState<Record<string, string>>({ initialData: { foo: 'bar' } })
			);

			const initialValue = result.current;

			result.current.reset({ bar: 'baz' });

			expect(result.current).toBe(initialValue);
			expect(result.current.getData()).toEqual({ bar: 'baz' });
		});

		it('should call merge when provided', () => {
			const merge = jest.fn();
			const { result } = renderHook(() =>
				useFormState<Record<string, string>>({ initialData: { foo: 'bar' }, merge })
			);

			const initialValue = result.current;

			result.current.reset({ bar: 'baz' });

			expect(result.current).toBe(initialValue);
			expect(result.current.getData()).toEqual({ bar: 'baz' });
			expect(merge).toHaveBeenCalledWith({ bar: 'baz' });
		});

		it('should call merge prefixed with name when provided', () => {
			const merge = jest.fn();
			const { result } = renderHook(() =>
				useFormState<Record<string, string>>({ initialData: { foo: 'bar' }, merge, name: 'foo' })
			);

			const initialValue = result.current;

			result.current.reset({ bar: 'baz' });

			expect(result.current).toBe(initialValue);
			expect(result.current.getData()).toEqual({ bar: 'baz' });
			expect(merge).toHaveBeenCalledWith({ foo: { bar: 'baz' } });
		});
	});

	describe('onChange', () => {
		it('should update data for a text input', () => {
			const { result } = renderHook(() => useFormState());

			const initialValue = result.current;

			// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
			const inputEvent: React.ChangeEvent<HTMLInputElement> = {
				target: {
					name: 'foo',
					value: 'bar',
					type: 'text',
				},
			} as React.ChangeEvent<HTMLInputElement>;

			result.current.onChange(inputEvent);

			expect(result.current).toBe(initialValue);
			expect(result.current.getData()).toEqual({
				foo: 'bar',
			});
		});

		it.each<string>(['checkbox', 'radio'])(
			'should update data for an input of type %s',
			(type: string) => {
				const { result } = renderHook(() => useFormState());

				const initialValue = result.current;

				// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
				const inputEvent: React.ChangeEvent<HTMLInputElement> = {
					target: {
						name: 'foo',
						value: 'bar',
						type: type,
						checked: true,
					},
				} as React.ChangeEvent<HTMLInputElement>;

				result.current.onChange(inputEvent);

				expect(result.current).toBe(initialValue);
				expect(result.current.getData()).toEqual({
					foo: 'bar',
				});

				inputEvent.target.checked = false;

				result.current.onChange(inputEvent);

				expect(result.current).toBe(initialValue);
				expect(result.current.getData()).toEqual({
					foo: false,
				});
			}
		);
	});

	it('should call submit onSubmit', () => {
		const submit = jest.fn();
		const { result } = renderHook(() => useFormState({ submit, initialData: { foo: 'bar' } }));

		const initialValue = result.current;

		// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
		const submitEvent: React.FormEvent<HTMLFormElement> = {
			preventDefault: jest.fn() as () => void,
		} as React.FormEvent<HTMLFormElement>;

		result.current.onSubmit(submitEvent);

		expect(result.current).toBe(initialValue);
		expect(submit).toHaveBeenCalledWith({
			foo: 'bar',
		});
		expect(submit).toHaveBeenCalledTimes(1);
	});
});
