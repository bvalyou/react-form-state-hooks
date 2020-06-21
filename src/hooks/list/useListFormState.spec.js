import { act, renderHook } from '@testing-library/react-hooks';
import { setUnique } from './listFormData';
import useListFormState from './useListFormState';

describe('useListFormState', () => {
	beforeEach(() => setUnique(0));

	it('should convert a data list into an object structure', () => {
		const data = [1, 2, 3];
		const { result } = renderHook(() => useListFormState({ name: 'foo', initialData: data }));

		expect(result.current).toEqual({
			data,
			mappedData: {
				'foo-0': 1,
				'foo-1': 2,
				'foo-2': 3,
			},
			entries: [
				{
					name: 'foo-0',
					value: 1,
					key: 'foo-0',
				},
				{
					name: 'foo-1',
					value: 2,
					key: 'foo-1',
				},
				{
					name: 'foo-2',
					value: 3,
					key: 'foo-2',
				},
			],
			updateData: expect.any(Function),
			addEntry: expect.any(Function),
			removeEntry: expect.any(Function),
		});
	});

	it('should default to an empty list', () => {
		const { result } = renderHook(() => useListFormState({ name: 'foo' }));

		expect(result.current).toEqual({
			data: [],
			mappedData: {},
			entries: [],
			updateData: expect.any(Function),
			addEntry: expect.any(Function),
			removeEntry: expect.any(Function),
		});
	});

	it('should update its value when updateData is called', () => {
		const { result } = renderHook(() => useListFormState({ name: 'foo', initialData: [''] }));

		act(() => {
			result.current.updateData('foo-0', 'bar');
		});

		expect(result.current).toEqual({
			data: ['bar'],
			mappedData: {
				'foo-0': 'bar',
			},
			entries: [
				{
					name: 'foo-0',
					key: 'foo-0',
					value: 'bar',
				},
			],
			updateData: expect.any(Function),
			addEntry: expect.any(Function),
			removeEntry: expect.any(Function),
		});
	});

	it('should update its value when addEntry is called', () => {
		const { result } = renderHook(() => useListFormState({ name: 'foo' }));

		act(() => {
			result.current.addEntry('bar');
		});

		expect(result.current).toEqual({
			data: ['bar'],
			mappedData: {
				'foo-0': 'bar',
			},
			entries: [
				{
					name: 'foo-0',
					key: 'foo-0',
					value: 'bar',
				},
			],
			updateData: expect.any(Function),
			addEntry: expect.any(Function),
			removeEntry: expect.any(Function),
		});
	});

	it('should correctly update its data and entries when addEntry is called with a specific index', () => {
		const updateData = jest.fn();
		const { result } = renderHook(() =>
			useListFormState({ name: 'foo', initialData: ['bar', 'baz'], updateData })
		);

		act(() => {
			result.current.addEntry('new value', 1);
		});

		expect(updateData).toHaveBeenCalledWith('foo', ['bar', 'new value', 'baz']);

		expect(result.current).toEqual({
			data: ['bar', 'new value', 'baz'],
			mappedData: {
				'foo-0': 'bar',
				'foo-1': 'baz',
				'foo-2': 'new value',
			},
			entries: [
				{
					name: 'foo-0',
					key: 'foo-0',
					value: 'bar',
				},
				{
					name: 'foo-2',
					key: 'foo-2',
					value: 'new value',
				},
				{
					name: 'foo-1',
					key: 'foo-1',
					value: 'baz',
				},
			],
			updateData: expect.any(Function),
			addEntry: expect.any(Function),
			removeEntry: expect.any(Function),
		});
	});

	it('should update its value when removeEntry is called', () => {
		const { result } = renderHook(() =>
			useListFormState({ name: 'foo', initialData: ['bar', 'baz'] })
		);

		act(() => {
			result.current.removeEntry('foo-0');
		});

		expect(result.current).toEqual({
			data: ['baz'],
			mappedData: {
				'foo-1': 'baz',
			},
			entries: [
				{
					name: 'foo-1',
					key: 'foo-1',
					value: 'baz',
				},
			],
			updateData: expect.any(Function),
			addEntry: expect.any(Function),
			removeEntry: expect.any(Function),
		});
	});

	it('should update its value when its data option changes', () => {
		const updateData = jest.fn();
		const { result, rerender } = renderHook(
			({ data }) => useListFormState({ name: 'foo', updateData, data }),
			{ initialProps: { data: ['foo', 'bar'] } }
		);

		expect(updateData).toHaveBeenCalledWith('foo', ['foo', 'bar']);

		rerender({ data: ['bar'] });

		expect(result.current).toEqual({
			data: ['bar'],
			mappedData: {
				'foo-0': 'bar',
			},
			entries: [
				{
					name: 'foo-0',
					key: 'foo-0',
					value: 'bar',
				},
			],
			updateData: expect.any(Function),
			addEntry: expect.any(Function),
			removeEntry: expect.any(Function),
		});
	});

	it('should not update its data if its new data is shallow equal with the old data', () => {
		const updateData = jest.fn();
		const { result, rerender } = renderHook(
			({ data }) => useListFormState({ name: 'foo', updateData, data }),
			{ initialProps: { data: ['foo', 'bar'] } }
		);

		expect(updateData).toHaveBeenCalledWith('foo', ['foo', 'bar']);

		const currentData = result.current.data;

		rerender({ data: ['foo', 'bar'] });

		// explicit toBe, not toEqual, to ensure the value is actually the same as before
		expect(result.current.data).toBe(currentData);
	});

	it.each([
		['updateData', (listFormState) => listFormState.updateData('foo-0', 'newValue'), ['newValue']],
		['addEntry', (listFormState) => listFormState.addEntry('newValue'), ['bar', 'newValue']],
		['removeEntry', (listFormState) => listFormState.removeEntry('foo-0'), []],
	])('should call its updateData option when its state changes via %s', (_, action, expected) => {
		const updateData = jest.fn();
		const { result } = renderHook(() =>
			useListFormState({ name: 'foo', updateData, initialData: ['bar'] })
		);

		expect(updateData).toHaveBeenCalledWith('foo', ['bar']);

		act(() => {
			action(result.current);
		});

		expect(updateData).toHaveBeenCalledWith('foo', expected);
		expect(updateData).toHaveBeenCalledTimes(2);
	});
});
