import { act, renderHook } from '@testing-library/react-hooks';
import { useFormState } from '../index';
import { reducer } from './useFormState.reducer';
import type { Data } from './useFormState.types';
import { FormStateActionType } from './useFormState.types';

describe('useFormState', () => {
	it('should return data, and updateData', () => {
		const { result } = renderHook(() => useFormState());

		expect(result.current).toEqual({
			data: {},
			updateData: expect.any(Function),
		});
	});

	it('should change its data when updateData is called', () => {
		const { result } = renderHook(() => useFormState());

		act(() => {
			result.current.updateData('foo', 'bar');
		});

		expect(result.current).toEqual({
			data: { foo: 'bar' },
			updateData: expect.any(Function),
		});
	});

	it('should call its updateData callback when its value changes', () => {
		const updateData = jest.fn();
		const { result } = renderHook(() => useFormState({ name: 'foo', updateData }));

		expect(updateData).toHaveBeenCalledWith('foo', {});

		act(() => {
			result.current.updateData('bar', 'baz');
		});

		expect(updateData).toHaveBeenCalledWith('foo', { bar: 'baz' });
		expect(updateData).toHaveBeenCalledTimes(2);
	});

	it('should reset its data when its data prop changes', () => {
		const updateData = jest.fn();
		const { result, rerender } = renderHook(
			({ data }) => useFormState({ name: 'foo', updateData, data }),
			{ initialProps: { data: {} } }
		);

		expect(updateData).toHaveBeenCalledWith('foo', {});

		updateData.mockClear();

		rerender({ data: { bar: 'baz' } });

		expect(updateData).not.toHaveBeenCalled();

		expect(result.current.data).toEqual({ bar: 'baz' });
	});

	it('should properly sync its state to its parent on mount', () => {
		const { result } = renderHook(() => {
			const parent = useFormState({ initialData: { foo: { bar: 'baz' } } });
			const child = useFormState({ ...parent, name: 'foo', data: parent.data.foo as Data });

			return { parent, child };
		});

		expect(result.current.parent.data).toEqual({ foo: { bar: 'baz' } });
		expect(result.current.child.data).toEqual({ bar: 'baz' });
	});

	describe('reducer failures', () => {
		it('should throw if called with FormStateActionType.Init', () => {
			expect(() =>
				reducer({ cause: FormStateActionType.Init, data: {} }, { type: FormStateActionType.Init })
			).toThrow();
		});

		it('should throw if called with FormStateActionType.Update and no name', () => {
			expect(() =>
				reducer({ cause: FormStateActionType.Init, data: {} }, { type: FormStateActionType.Update })
			).toThrow();
		});

		it('should throw if called with FormStateActionType.Reset and no data', () => {
			expect(() =>
				reducer({ cause: FormStateActionType.Init, data: {} }, { type: FormStateActionType.Reset })
			).toThrow();
		});
	});
});
