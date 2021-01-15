import { useEffect, useMemo, useReducer, useRef } from 'react';
import { compareEntries, unmapData } from '../utils/listFormData';
import { FormState } from './useFormState.types';
import { init, reducer } from './useListFormState.reducer';
import {
	Entry,
	ListActionType,
	ListFormState,
	UseListFormStateOptions,
} from './useListFormState.types';

export function isListFormState(
	formState: FormState | ListFormState | null
): formState is ListFormState {
	return !!(formState && (formState as ListFormState).entries);
}

export default function useListFormState(options: UseListFormStateOptions = {}): ListFormState {
	const { name, merge } = options;
	const [
		{ indexMap, cause, newName, newValue, initialFormData, removedName },
		dispatch,
	] = useReducer(reducer, options, init);
	const formData = useRef(initialFormData || {});

	useEffect(() => {
		if (cause === ListActionType.Add && newName) {
			formData.current[newName] = newValue;

			if (name && merge) {
				merge({ [name]: unmapData(formData.current, indexMap) });
			}
		}
	}, [name, indexMap, merge, cause, newName, newValue]);

	useEffect(() => {
		if (cause === ListActionType.Remove && removedName) {
			delete formData.current[removedName];

			if (name && merge) {
				merge({ [name]: unmapData(formData.current, indexMap) });
			}
		}
	});

	useEffect(() => {
		if (cause === ListActionType.Reset && initialFormData) {
			formData.current = initialFormData;

			if (name && merge) {
				merge({ [name]: unmapData(formData.current, indexMap) });
			}
		}
	}, [name, merge, indexMap, cause, initialFormData]);

	return useMemo(
		(): ListFormState => ({
			entries: Object.entries(indexMap)
				.sort(compareEntries)
				.map(
					([name]): Entry => ({
						name,
						key: name,
						initialValue: formData.current[name],
					})
				),
			addEntry: (value, index) => {
				dispatch({ type: ListActionType.Add, name, value, index });
			},
			removeEntry: (name) => {
				dispatch({ type: ListActionType.Remove, name });
			},
			getData: () => ({
				formData: formData.current,
				data: unmapData(formData.current, indexMap),
			}),
			merge: (data) => {
				formData.current = { ...formData.current, ...data };

				if (name && merge) {
					merge({ [name]: unmapData(formData.current, indexMap) });
				}

				return formData.current;
			},
			reset: (data) => {
				dispatch({ type: ListActionType.Reset, data });

				return data || [];
			},
		}),
		[indexMap, merge, name]
	);
}
