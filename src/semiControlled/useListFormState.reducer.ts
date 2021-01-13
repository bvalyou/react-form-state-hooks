import {
	InternalListFormState,
	ListActionType,
	ListFormStateAction,
	UseListFormStateOptions,
} from './useListFormState.types';
import {
	addFieldToIndexMapping,
	createIndexMapping,
	mapData,
	removeFieldFromIndexMapping,
} from '../utils/listFormData';

export function init(options: UseListFormStateOptions): InternalListFormState {
	const indexMap = createIndexMapping(options.name, options.initialData || []);
	return {
		indexMap,
		initialFormData: mapData(options.initialData, indexMap),
	};
}

export function reducer(
	prevState: InternalListFormState,
	action: ListFormStateAction
): InternalListFormState {
	switch (action.type) {
		case ListActionType.Add: {
			const [indexMap, newName] = addFieldToIndexMapping(
				action.name,
				prevState.indexMap,
				action.index
			);
			return { indexMap, newName, newValue: action.value, cause: action.type };
		}
		case ListActionType.Remove: {
			if (!action.name) {
				throw new Error('action.name is required for action type Remove');
			}

			return { indexMap: removeFieldFromIndexMapping(action.name, prevState.indexMap) };
		}
		case ListActionType.Reset: {
			const indexMap = createIndexMapping(action.name, action.data || []);
			return {
				indexMap,
				cause: action.type,
				initialFormData: mapData(action.data, indexMap),
			};
		}
		default: {
			throw new Error('Unsupported action type');
		}
	}
}
