import { useEffect, useMemo, useReducer, useRef } from 'react';
import {
	Entry,
	ListActionType,
	ListFormState,
	UseListFormStateOptions,
} from './useListFormState.types';
import { init, reducer } from './useListFormState.reducer';
import { compareEntries, unmapData } from '../utils/listFormData';
import { FormState } from './useFormState.types';

export function isListFormState(
	formState: FormState | ListFormState | null
): formState is ListFormState {
	return !!(formState && (formState as ListFormState).mappedData);
}

export default function useListFormState(options: UseListFormStateOptions = {}): ListFormState {
	const { name } = options;
	const [{ indexMap, cause, newName, newValue, initialFormData }, dispatch] = useReducer(
		reducer,
		options,
		init
	);
	const formData = useRef(initialFormData || {});

	useEffect(() => {
		if (cause === ListActionType.Add && newName) {
			formData.current[newName] = newValue;
		}
	}, [cause, newName, newValue]);

	useEffect(() => {
		if (cause === ListActionType.Reset && initialFormData) {
			formData.current = initialFormData;
		}
	}, [cause, initialFormData]);

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
			mappedData: formData.current,
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

				return formData.current;
			},
			reset: (data: unknown[]) => {
				dispatch({ type: ListActionType.Reset, data });

				return data;
			},
		}),
		[indexMap, name]
	);
}
