import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { compareEntries, unmapData } from '../../utils/listFormData';
import type { FormState } from '../useFormState.types';
import { init, reducer } from './useListFormState.reducer';
import type { ListFormState, UseListFormStateOptions } from './useListFormState.types';
import { ListActionType } from './useListFormState.types';

/**
 * @module useListFormState
 */

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
			dispatch({ type: ListActionType.Reset, data, name });
		}
	}, [data, name]);

	useEffect(() => {
		if (updateDataProp && name && state.cause !== ListActionType.Reset) {
			updateDataProp(name, unmapData(state.data, state.indexMap));
		}
	}, [updateDataProp, name, state]);

	// memoizing these methods separately from the return value so you can safely pass them through to a memoized input as the data changes
	const updateData = useCallback(
		(name, value) => dispatch({ type: ListActionType.Update, name, value }),
		[]
	);

	const addEntry = useCallback(
		(value: unknown, index?: number) => dispatch({ type: ListActionType.Add, name, value, index }),
		[name]
	);
	const removeEntry = useCallback(
		(name: string) => dispatch({ type: ListActionType.Remove, name }),
		[]
	);

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
