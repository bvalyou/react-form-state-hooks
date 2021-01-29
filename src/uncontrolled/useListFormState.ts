import type { Dispatch } from 'react';
import { useEffect, useMemo, useReducer, useRef } from 'react';
import { compareEntries, unmapData } from '../utils/listFormData';
import type { ListFormData } from '../utils/listFormData.types';
import type { FormState } from './useFormState.types';
import { init, reducer } from './useListFormState.reducer';
import type {
	Entry,
	InternalListFormState,
	ListFormState,
	ListFormStateAction,
	ListFormStateReducer,
	UseListFormStateOptions,
} from './useListFormState.types';
import { ListActionType } from './useListFormState.types';

export function isListFormState(
	formState: FormState | ListFormState | null
): formState is ListFormState {
	return !!(formState && (formState as ListFormState).entries);
}

export default function useListFormState<T = unknown>(
	options: UseListFormStateOptions<T> = {}
): ListFormState<T> {
	const { name, merge } = options;
	const [{ indexMap, cause, newName, newValue, initialFormData, removedName }, dispatch]: [
		InternalListFormState<T>,
		Dispatch<ListFormStateAction<T>>
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		// useReducer's generic type doesn't understand the init arg - it thinks second arg must be type of state
	] = useReducer<ListFormStateReducer<T>>(reducer, options, init);
	const formData = useRef<ListFormData<T>>(initialFormData || {});

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

	return useMemo<ListFormState<T>>(
		() => ({
			entries: Object.entries<number>(indexMap)
				.sort(compareEntries)
				.map(
					([name]): Entry<T> => ({
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
				data: unmapData<T>(formData.current, indexMap),
			}),
			merge: (data) => {
				formData.current = { ...formData.current, ...data };

				if (name && merge) {
					merge({ [name]: unmapData<T>(formData.current, indexMap) });
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
