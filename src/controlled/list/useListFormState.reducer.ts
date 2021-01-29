import {
	addFieldToIndexMapping,
	createIndexMapping,
	mapData,
	removeFieldFromIndexMapping,
	unmapData,
	updateIndexMapping,
} from '../../utils/listFormData';
import type {
	InternalListFormState,
	ListFormStateAction,
	ListFormStateReducerInitOptions,
} from './useListFormState.types';
import { ListActionType } from './useListFormState.types';

/**
 * Creates initial state
 * @param name - The key in the parent state object where this list will go
 * @param initialData - The initial values the list contains
 * @param data - The current list values
 * @private
 */
export function init<T = unknown>({
	name,
	initialData,
	data,
}: ListFormStateReducerInitOptions<T>): InternalListFormState<T> {
	const indexMap = createIndexMapping(name, data || initialData);

	return {
		indexMap,
		formData: mapData<T>(data || initialData, indexMap),
		cause: ListActionType.Init,
	};
}

/**
 * Derives the next state using an action
 * @param prevState - The prior state for the form
 * @param action - Used to derive the next state
 * @returns The new state
 * @private
 */
export function reducer<T = unknown>(
	prevState: InternalListFormState<T>,
	action: ListFormStateAction<T>
): InternalListFormState<T> {
	switch (action.type) {
		case ListActionType.Update: {
			if (!action.name) {
				throw new Error('action.name is required for action type update');
			}
			return {
				indexMap: prevState.indexMap,
				formData: {
					...prevState.formData,
					[action.name]: action.value,
				},
				cause: action.type,
			};
		}
		case ListActionType.Add: {
			const [indexMap, newName] = addFieldToIndexMapping(
				action.name,
				prevState.indexMap,
				action.index
			);

			return {
				indexMap,
				formData: {
					...prevState.formData,
					[newName]: action.value,
				},
				cause: action.type,
			};
		}
		case ListActionType.Remove: {
			if (!action.name) {
				throw new Error('action.name is required for action type remove');
			}
			return {
				indexMap: removeFieldFromIndexMapping(action.name, prevState.indexMap),
				formData: Object.entries(prevState.formData)
					.filter(([key]) => key !== action.name)
					.reduce(
						(memo, [key, value]) => ({
							...memo,
							[key]: value,
						}),
						{}
					),
				cause: action.type,
			};
		}
		case ListActionType.Reset: {
			if (!action.data) {
				throw new Error('action.data is required for action type reset');
			}

			if (!action.name) {
				throw new Error('action.name is required for action type reset');
			}

			const prevArray = unmapData(prevState.formData, prevState.indexMap);

			if (
				action.data.length &&
				action.data.every((value: unknown, index: number) => value === prevArray[index])
			) {
				return prevState;
			}

			const indexMap = updateIndexMapping(action.name, prevState.indexMap, action.data);

			return {
				indexMap,
				formData: mapData<T>(action.data, indexMap),
				cause: action.type,
			};
		}
		default: {
			throw new Error('Unsupported action type');
		}
	}
}
