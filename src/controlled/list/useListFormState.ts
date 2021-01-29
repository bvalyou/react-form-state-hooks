import type { Dispatch } from 'react';
import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { compareEntries, unmapData } from '../../utils/listFormData';
import type { FormState } from '../useFormState.types';
import { init, reducer } from './useListFormState.reducer';
import type {
	AddEntry,
	InternalListFormState,
	ListFormState,
	ListFormStateAction,
	ListFormStateReducer,
	RemoveEntry,
	UpdateListData,
	UseListFormStateOptions,
} from './useListFormState.types';
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
 * @param {UpdateListData} [options.updateData] - A function to call when the data changes
 * @param {Array<*>} [options.initialData = []] - The initial values the list contains
 * @param {Array<*>} [options.data] - The current values the list contains - overrides internal state
 * @returns {ListFormState} Tools for rendering your form
 * @alias module:useListFormState
 */
function useListFormState<T = unknown>({
	name,
	updateData: updateDataProp,
	data,
	initialData = [],
}: UseListFormStateOptions<T>): ListFormState<T> {
	const [state, dispatch]: [
		InternalListFormState<T>,
		Dispatch<ListFormStateAction<T>>
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		// useReducer's generic type doesn't understand the init arg - it thinks second arg must be type of state
	] = useReducer<ListFormStateReducer<T>>(reducer, { name, initialData, data }, init);

	useEffect(() => {
		if (data) {
			dispatch({ type: ListActionType.Reset, data, name });
		}
	}, [data, name]);

	useEffect(() => {
		if (updateDataProp && name && state.cause !== ListActionType.Reset) {
			updateDataProp(name, unmapData(state.formData, state.indexMap));
		}
	}, [updateDataProp, name, state]);

	// memoizing these methods separately from the return value so you can safely pass them through to a memoized input as the data changes
	const updateData = useCallback<UpdateListData<T>>(
		(name, value) => dispatch({ type: ListActionType.Update, name, value }),
		[]
	);

	const addEntry = useCallback<AddEntry<T>>(
		(value, index) => dispatch({ type: ListActionType.Add, name, value, index }),
		[name]
	);
	const removeEntry = useCallback<RemoveEntry>(
		(name: string) => dispatch({ type: ListActionType.Remove, name }),
		[]
	);

	return useMemo<ListFormState<T>>(
		() => ({
			entries: Object.entries(state.indexMap)
				.sort(compareEntries)
				.map(([key]) => ({
					name: key,
					key,
					value: state.formData[key],
				})),
			data: unmapData<T>(state.formData, state.indexMap),
			mappedData: state.formData,
			updateData,
			addEntry,
			removeEntry,
		}),
		[state, updateData, addEntry, removeEntry]
	);
}

export default useListFormState;
