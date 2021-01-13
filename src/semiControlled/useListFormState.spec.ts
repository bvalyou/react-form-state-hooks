import { act, renderHook } from '@testing-library/react-hooks';
import useListFormState from './useListFormState';
import { setUnique } from '../utils/listFormData';

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

	describe('addEntry', () => {
		it('should update the formState data', () => {
			const { result } = renderHook(() => useListFormState({ initialData: ['foo', 'bar'] }));

			act(() => result.current.addEntry('baz'));

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

			act(() => result.current.addEntry('bar', 1));

			expect(result.current.getData()).toEqual({
				formData: {
					'undefined-0': 'foo',
					'undefined-2': 'bar',
					'undefined-1': 'baz',
				},
				data: ['foo', 'bar', 'baz'],
			});
		});
	});

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
});
