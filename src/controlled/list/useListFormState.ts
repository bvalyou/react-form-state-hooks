import { useCallback, useEffect, useMemo, useReducer } from 'react';
import {
	addFieldToIndexMapping,
	compareEntries,
	createIndexMapping,
	mapData,
	removeFieldFromIndexMapping,
	unmapData,
	updateIndexMapping,
} from '../../utils/listFormData';
import type { FormState } from '../useFormState.types';
import type {
	InternalListFormState,
	ListFormState,
	ListFormStateAction,
	UseListFormStateOptions,
} from './useListFormState.types';

/**
 * @module useListFormState
 */

/**
 * Creates initial state
 * @param name - The key in the parent state object where this list will go
 * @param initialData - The initial values the list contains
 * @param data - The current list values
 * @private
 */
function init({
	name,
	initialData,
	data,
}: {
	name?: string;
	initialData: unknown[];
	data?: unknown[];
}): InternalListFormState {
	const indexMap = createIndexMapping(name, data || initialData);

	return {
		indexMap,
		data: mapData(data || initialData, indexMap),
	};
}

/**
 * Derives the next state using an action
 * @param prevState - The prior state for the form
 * @param action - Used to derive the next state
 * @returns The new state
 * @private
 */
function reducer(
	prevState: InternalListFormState,
	action: ListFormStateAction
): InternalListFormState {
	switch (action.type) {
		case 'change': {
			if (!action.name) {
				throw new Error('action.name is required for action type update');
			}
			return {
				indexMap: prevState.indexMap,
				data: {
					...prevState.data,
					[action.name]: action.value,
				},
			};
		}
		case 'add': {
			if (!action.name) {
				throw new Error('action.name is required for action type add');
			}

			const [indexMap, newName] = addFieldToIndexMapping(
				action.name,
				prevState.indexMap,
				action.index
			);
			return {
				indexMap,
				data: {
					...prevState.data,
					[newName]: action.value,
				},
			};
		}
		case 'remove': {
			if (!action.name) {
				throw new Error('action.name is required for action type remove');
			}
			return {
				indexMap: removeFieldFromIndexMapping(action.name, prevState.indexMap),
				data: Object.entries(prevState.data)
					.filter(([key]) => key !== action.name)
					.reduce(
						(memo, [key, value]) => ({
							...memo,
							[key]: value,
						}),
						{}
					),
			};
		}
		case 'reset': {
			if (!action.data) {
				throw new Error('action.data is required for action type reset');
			}

			if (!action.name) {
				throw new Error('action.name is required for action type reset');
			}

			const prevArray = unmapData(prevState.data, prevState.indexMap);

			if (
				action.data.length &&
				action.data.every((value: unknown, index: number) => value === prevArray[index])
			) {
				return prevState;
			}

			const indexMap = updateIndexMapping(action.name, prevState.indexMap, action.data);

			return {
				indexMap,
				data: mapData(action.data, indexMap),
				cause: 'reset',
			};
		}
		default: {
			throw new Error('Unsupported action type');
		}
	}
}

export function isListFormState(
	formState: FormState | ListFormState | null
): formState is ListFormState {
	return !!(formState && (formState as ListFormState).mappedData);
}

/**
 * Manages state for a list-shaped form
 * @param {UseListFormStateOptions} options - Accepts the following:
 * @param {string} [options.name] - The key in the parent state object where this list will go
 * @param {UpdateData} [options.updateData] - A function to call when the data changes
 * @param {Array<*>} [options.initialData = []] - The initial values the list contains
 * @param {Array<*>} [options.data] - The current values the list contains - overrides internal state
 * @returns {ListFormState} Tools for rendering your form
 * @alias module:useListFormState
 */
function useListFormState({
	name,
	updateData: updateDataProp,
	data,
	initialData = [],
}: UseListFormStateOptions): ListFormState {
	const [state, dispatch] = useReducer(reducer, { name, initialData, data }, init);

	useEffect(() => {
		if (data) {
			dispatch({ type: 'reset', data, name });
		}
	}, [data, name]);

	useEffect(() => {
		if (updateDataProp && name && state.cause !== 'reset') {
			updateDataProp(name, unmapData(state.data, state.indexMap));
		}
	}, [updateDataProp, name, state]);

	// memoizing these methods separately from the return value so you can safely pass them through to a memoized input as the data changes
	const updateData = useCallback((name, value) => dispatch({ type: 'change', name, value }), []);

	const addEntry = useCallback(
		(value: unknown, index?: number) => dispatch({ type: 'add', name, value, index }),
		[name]
	);
	const removeEntry = useCallback((name: string) => dispatch({ type: 'remove', name }), []);

	return useMemo(
		() => ({
			entries: Object.entries(state.indexMap)
				.sort(compareEntries)
				.map(([key]) => ({
					name: key,
					key,
					value: state.data[key],
				})),
			data: unmapData(state.data, state.indexMap),
			mappedData: state.data,
			updateData,
			addEntry,
			removeEntry,
		}),
		[state, updateData, addEntry, removeEntry]
	);
}

export default useListFormState;
