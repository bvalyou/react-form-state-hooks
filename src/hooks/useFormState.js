import { useCallback, useEffect, useMemo, useReducer } from 'react';

/**
 * @module useFormState
 */

/**
 * Derives the next state using an action
 * @param {Object<*>} prevState - The previous data for the form
 * @param {Object} action - Used to derive the next state
 * @returns {Object<*>} - The new data
 * @private
 */
function reducer(prevState, action) {
	switch (action.type) {
		case 'update': {
			return {
				data: {
					...prevState.data,
					[action.name]: action.value,
				},
			};
		}
		case 'reset': {
			return {
				data: action.data,
				cause: 'reset',
			};
		}
	}
}

/**
 * @typedef formState
 * @property {Object<*>} data - The current managed data object
 * @property {updateData} updateData - Handles a change to a field in the data
 */

/**
 * @callback updateData - Handles a change to a field in the data
 * @param {string} name - The name the change belongs to
 * @param {*} value - The new value corresponding to name
 */

/**
 * Manages state for an object-shaped form
 * @param {Object} [options] - Accepts the following:
 * @param {Object<*>} [options.initialData = {}] - The initial values for the form
 * @param {string} [options.name] - An identifier in the parent data where this section belongs
 * @param {updateData} [options.updateData] - Propagates internal state up to the parent
 * @param {Object<*>} [options.data] - The current data for the section - overrides internal data
 * @returns {formState} Tools for rendering your form
 * @alias module:useFormState
 */
function useFormState({
	initialData = {},
	name: nameProp,
	updateData: updateDataProp,
	data: dataProp,
} = {}) {
	const [state, dispatch] = useReducer(reducer, { data: dataProp || initialData });

	useEffect(() => {
		if (dataProp) {
			dispatch({ type: 'reset', data: dataProp });
		}
	}, [dataProp]);

	useEffect(() => {
		if (updateDataProp && state.cause !== 'reset') {
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
