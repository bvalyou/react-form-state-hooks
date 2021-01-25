import { act, renderHook } from '@testing-library/react-hooks';
import { setUnique } from '../utils/listFormData';
import useListFormState from './useListFormState';
import { reducer } from './useListFormState.reducer';
import { ListActionType } from './useListFormState.types';

describe('useListFormState', () => {
	beforeEach(() => {
		setUnique(0);
	});

	it('should provide its initialData from getData', () => {
		const { result } = renderHook(() => useListFormState({ initialData: ['foo', 'bar'] }));

		expect(result.current.getData()).toEqual({
			formData: {
				'undefined-0': 'foo',
				'undefined-1': 'bar',
			},
			data: ['foo', 'bar'],
		});
	});

	it('should update its parent FormState when merge is called', () => {
		const merge = jest.fn((value) => value);
		const { result } = renderHook(() =>
			useListFormState({ initialData: ['foo', 'bar'], name: 'foo', merge })
		);

		act(() => {
			result.current.merge({ 'foo-0': 'four' });
		});

		expect(merge).toHaveBeenCalledWith({ foo: ['four', 'bar'] });

		expect(result.current.getData()).toEqual({
			formData: {
				'foo-0': 'four',
				'foo-1': 'bar',
			},
			data: ['four', 'bar'],
		});
	});

	describe('addEntry', () => {
		it('should update the formState data', () => {
			const { result } = renderHook(() => useListFormState({ initialData: ['foo', 'bar'] }));

			act(() => {
				result.current.addEntry('baz');
			});

			expect(result.current.getData()).toEqual({
				formData: {
					'undefined-0': 'foo',
					'undefined-1': 'bar',
					'undefined-2': 'baz',
				},
				data: ['foo', 'bar', 'baz'],
			});
		});

		it('should support a specific index', () => {
			const { result } = renderHook(() => useListFormState({ initialData: ['foo', 'baz'] }));

			act(() => {
				result.current.addEntry('bar', 1);
			});

			expect(result.current.getData()).toEqual({
				formData: {
					'undefined-0': 'foo',
					'undefined-2': 'bar',
					'undefined-1': 'baz',
				},
				data: ['foo', 'bar', 'baz'],
			});
		});

		it('should update a parent FormState when provided', () => {
			const merge = jest.fn((value) => value);
			const { result } = renderHook(() =>
				useListFormState({ initialData: ['foo', 'bar'], name: 'foo', merge })
			);

			act(() => {
				result.current.addEntry('baz');
			});

			expect(merge).toHaveBeenCalledWith({ foo: ['foo', 'bar', 'baz'] });
		});
	});

	describe('reset', () => {
		it('should reset to the provided data', () => {
			const { result } = renderHook(() => useListFormState());

			act(() => {
				result.current.reset(['foo', 'bar']);
			});

			expect(result.current.getData()).toEqual({
				formData: {
					'undefined-0': 'foo',
					'undefined-1': 'bar',
				},
				data: ['foo', 'bar'],
			});
		});

		it('should reset to empty', () => {
			const { result } = renderHook(() => useListFormState());

			act(() => {
				result.current.reset(undefined);
			});

			expect(result.current.getData()).toEqual({
				formData: {},
				data: [],
			});
		});

		it('should update a parent FormState when provided', () => {
			const merge = jest.fn((value) => value);
			const { result } = renderHook(() => useListFormState({ name: 'foo', merge }));

			act(() => {
				result.current.reset(['foo', 'bar']);
			});

			expect(merge).toHaveBeenCalledWith({ foo: ['foo', 'bar'] });
		});
	});

	describe('removeEntry', () => {
		it('should update the formState data', () => {
			const { result } = renderHook(() => useListFormState({ initialData: ['foo', 'bar'] }));

			act(() => result.current.removeEntry('undefined-0'));

			expect(result.current.getData()).toEqual({
				formData: {
					'undefined-1': 'bar',
				},
				data: ['bar'],
			});
		});

		it('should update a parent FormState when provided', () => {
			const merge = jest.fn((value) => value);
			const { result } = renderHook(() =>
				useListFormState({ name: 'foo', initialData: ['foo', 'bar'], merge })
			);

			act(() => {
				result.current.removeEntry('foo-0');
			});

			expect(merge).toHaveBeenCalledWith({ foo: ['bar'] });
		});
	});

	describe('reducer failures', () => {
		it('should throw an error if called with ListActionType.Remove but no name', () => {
			expect(() =>
				reducer({ indexMap: {}, cause: ListActionType.Init }, { type: ListActionType.Remove })
			).toThrow();
		});

		it('should throw an error if called with ListActionType.Init', () => {
			expect(() =>
				reducer({ indexMap: {}, cause: ListActionType.Init }, { type: ListActionType.Init })
			).toThrow();
		});
	});
});
