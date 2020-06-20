import { useCallback, useEffect, useMemo, useReducer } from 'react';
import {
	addFieldToIndexMapping,
	compareEntries,
	createIndexMapping,
	mapData,
	removeFieldFromIndexMapping,
	unmapData,
	updateIndexMapping,
} from './listFormData';

/**
 * @module useListFormState
 */

/**
 * Creates the initial state for {@link module:useListFormState}
 * @param {string} name - The key in the parent state object where this list will go
 * @param {Array<*>} [initialData] - The initial values the list contains
 * @param {Array<*>} [data] - The current list values
 * @returns {{
 *   data: Object<*>, indexMap: Object<number>
 * }}
 * @private
 */
function init({ name, initialData, data }) {
	const indexMap = createIndexMapping(name, data || initialData);

	return {
		indexMap,
		data: mapData(data || initialData, indexMap),
	};
}

/**
 * Derives the next state using an action
 * @param {{ data: Object<*>, indexMap: Object<number> }} prevState - The prior state for the form
 * @param {Object} action - Used to derive the next state
 * @returns {{ data: Object<*>, indexMap: Object<number> }} The new state
 * @private
 */
function reducer(prevState, action) {
	switch (action.type) {
		case 'change': {
			return {
				indexMap: prevState.indexMap,
				data: {
					...prevState.data,
					[action.name]: action.value,
				},
			};
		}
		case 'add': {
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
			const prevArray = unmapData(prevState.data, prevState.indexMap);

			if (action.data.length && action.data.every((value, index) => value === prevArray[index])) {
				return prevState;
			}

			const indexMap = updateIndexMapping(action.name, prevState.indexMap, action.data);

			return {
				indexMap,
				data: mapData(action.data, indexMap),
				cause: 'reset',
			};
		}
	}
}

/**
 * @typedef listFormState
 * @property {Array<listFormEntry>} entries - Entries to render your form sections/fields
 * @property {Array<*>} data - The current managed list values
 * @property {Object<*>} mappedData - The internal object structure - works well for connecting a context built for formState
 * @property {updateData} updateData - Handles a change to a field in the data
 * @property {addEntry} addEntry - Adds a new entry to the list
 * @property {removeEntry} removeEntry - Removes an entry from the list
 */

/**
 * @typedef listFormEntry
 * @property {string} name - A generated name for the entry
 * @property {string} key - A unique identifier for an iterator function
 * @property {*} value - The current value held by this entry
 */

/**
 * @callback updateData - Changes an entry in the data
 * @param {string} name - The generated name of the entry the change belongs to
 * @param {*} value - The new value
 */

/**
 * @callback addEntry - Adds a new entry to the list
 * @param {*} value - The initial value for the new entry
 * @param number [index] - The index the entry should be inserted into
 */

/**
 * @callback removeEntry - Removes an entry from the list
 * @param {string} name - The name of the entry from `entries`
 */

/**
 * Manages state for a list-shaped form
 * @param {Object} options - Accepts the following:
 * @param {string} [options.name] - The key in the parent state object where this list will go
 * @param {updateData} [options.updateData] - A function to call when the data changes
 * @param {Array<*>} [options.initialData = []] - The initial values the list contains
 * @param {Array<*>} [options.data] - The current values the list contains - overrides internal state
 * @returns {listFormState} Tools for rendering your form
 * @alias module:useListFormState
 */
function useListFormState({ name, updateData: updateDataProp, data, initialData = [] }) {
	const [state, dispatch] = useReducer(reducer, { name, initialData, data }, init);

	useEffect(() => {
		if (data) {
			dispatch({ type: 'reset', data, name });
		}
	}, [data, name]);

	useEffect(() => {
		if (updateDataProp && state.cause !== 'reset') {
			updateDataProp(name, unmapData(state.data, state.indexMap));
		}
	}, [updateDataProp, name, state]);

	// memoizing these methods separately from the return value so you can safely pass them through to a memoized input as the data changes
	const updateData = useCallback((name, value) => dispatch({ type: 'change', name, value }), []);

	const addEntry = useCallback((value, index) => dispatch({ type: 'add', name, value, index }), [
		name,
	]);
	const removeEntry = useCallback((name) => dispatch({ type: 'remove', name }), []);

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
