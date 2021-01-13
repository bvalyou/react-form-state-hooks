import { useCallback, useEffect, useMemo, useReducer } from 'react';
import {
	FormState,
	FormStateAction,
	InternalFormState,
	UseFormStateOptions,
} from './useFormState.types';

/**
 * @module useFormState
 */

/**
 * Derives the next state using an action
 * @param {InternalFormState} prevState - The previous data for the form
 * @param {FormStateAction} action - Used to derive the next state
 * @returns {InternalFormState} - The new data
 * @private
 */
function reducer(prevState: InternalFormState, action: FormStateAction): InternalFormState {
	switch (action.type) {
		case 'update': {
			if (!action.name) {
				throw new Error('action.name is required for action type update');
			}

			return {
				data: {
					...prevState.data,
					[action.name]: action.value,
				},
			};
		}
		case 'reset': {
			if (!action.data) {
				throw new Error('action.data is required for action type reset');
			}

			return {
				data: action.data,
				cause: 'reset',
			};
		}
		default: {
			throw new Error('Unsupported action type');
		}
	}
}

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
function useFormState({
	initialData = {},
	name: nameProp,
	updateData: updateDataProp,
	data: dataProp,
}: UseFormStateOptions = {}): FormState {
	const [state, dispatch] = useReducer(reducer, { data: dataProp || initialData });

	useEffect(() => {
		if (dataProp) {
			dispatch({ type: 'reset', data: dataProp });
		}
	}, [dataProp]);

	useEffect(() => {
		if (updateDataProp && nameProp && state.cause !== 'reset') {
			updateDataProp(nameProp, state.data);
		}
	}, [updateDataProp, nameProp, state]);

	const updateData = useCallback((name, value) => dispatch({ type: 'update', name, value }), []);

	return useMemo(
		() => ({
			data: state.data,
			updateData,
		}),
		[state.data, updateData]
	);
}

export default useFormState;
