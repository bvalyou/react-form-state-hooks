import { act, renderHook } from '@testing-library/react-hooks';
import { useFormState } from './index';

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

		rerender({ data: { bar: 'baz' } });

		expect(updateData).toHaveBeenCalledWith('foo', { bar: 'baz' });

		expect(result.current.data).toEqual({ bar: 'baz' });
	});
});
