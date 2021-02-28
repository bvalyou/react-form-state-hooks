import type React from 'react';
import { useCallback, useMemo, useRef } from 'react';
import createOnChange from './createOnChange';
import type { Data, FormState, UseFormStateOptions } from './useFormState.types';

function useFormState<T extends Data = Data>({
	initialData: initialDataOption = {} as T,
	merge: mergeOption,
	name: nameOption,
	submit: submitOption,
}: UseFormStateOptions<T> = {}): FormState<T> {
	const data = useRef<T>(initialDataOption);

	const getData = useCallback<() => T>(() => data.current, []);

	const merge = useCallback(
		(nextState) => {
			data.current = { ...data.current, ...nextState };

			mergeOption?.(nameOption ? { [nameOption]: data.current } : data.current);

			return data.current;
		},
		[mergeOption, nameOption]
	);

	const reset = useCallback<(nextState: T) => T>(
		(nextState) => {
			data.current = nextState;

			mergeOption?.(nameOption ? { [nameOption]: data.current } : data.current);

			return data.current;
		},
		[mergeOption, nameOption]
	);

	const onChange = useCallback((event) => createOnChange(merge)(event), [merge]);

	const onSubmit = useCallback(
		(event: React.FormEvent) => {
			event.preventDefault();

			submitOption?.(data.current);
		},
		[submitOption]
	);

	return useMemo(
		() => ({
			getData,
			merge,
			reset,
			onChange,
			onSubmit,
		}),
		[getData, merge, onChange, reset, onSubmit]
	);
}

export default useFormState;
