import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { reducer } from './useFormState.reducer';
import type { Data, FormState, FormStateReducer, UseFormStateOptions } from './useFormState.types';
import { FormStateActionType } from './useFormState.types';

/**
 * @module useFormState
 */

/**
 * Manages state for an object-shaped form
 * @param {UseFormStateOptions} [options] - Accepts the following:
 * @param {Data} [options.initialData = {}] - The initial values for the form
 * @param {string} [options.name] - An identifier in the parent data where this section belongs
 * @param {UpdateData} [options.updateData] - Propagates internal state up to the parent
 * @param {Data} [options.data] - The current data for the section - overrides internal data
 * @returns {FormState} Tools for rendering a form
 * @alias module:useFormState
 */
function useFormState<T extends Data = Data>({
	initialData = {} as T,
	name: nameProp,
	updateData: updateDataProp,
	data: dataProp,
}: UseFormStateOptions<T> = {}): FormState<T> {
	const [state, dispatch] = useReducer<FormStateReducer<T>>(reducer, {
		data: dataProp || initialData,
		cause: FormStateActionType.Init,
	});

	useEffect(() => {
		if (dataProp) {
			dispatch({ type: FormStateActionType.Reset, data: dataProp });
		}
	}, [dataProp]);

	useEffect(() => {
		if (updateDataProp && nameProp && state.cause !== FormStateActionType.Reset) {
			updateDataProp(nameProp, state.data);
		}
	}, [updateDataProp, nameProp, state]);

	const updateData = useCallback(
		(name, value) => dispatch({ type: FormStateActionType.Update, name, value }),
		[]
	);

	return useMemo(
		() => ({
			data: state.data,
			updateData,
		}),
		[state.data, updateData]
	);
}

export default useFormState;
