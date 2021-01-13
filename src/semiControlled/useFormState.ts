import React, { useCallback, useMemo, useRef } from 'react';
import { ChangeEvent, Data, FormState, UseFormStateOptions } from './useFormState.types';

const useFormState = ({
	initialData: initialDataOption,
	merge: mergeOption,
	name: nameOption,
	submit: submitOption,
}: UseFormStateOptions = {}): FormState => {
	const data = useRef(initialDataOption || {});

	const getData = useCallback((): Data => data.current, []);

	const merge = useCallback(
		(nextState) => {
			data.current = { ...data.current, ...nextState };

			mergeOption?.(nameOption ? { [nameOption]: data.current } : data.current);

			return data.current;
		},
		[mergeOption, nameOption]
	);

	const reset = useCallback((nextState: Data) => {
		data.current = nextState;

		return data.current;
	}, []);

	const onChange = useCallback(
		(event: ChangeEvent) => {
			const { target: eventTarget } = event;
			const { name, value, type } = eventTarget;

			if (type === 'radio' || type === 'checkbox') {
				const { checked } = eventTarget as HTMLInputElement;
				return merge({ [name]: checked ? value : false });
			}

			return merge({ [name]: value });
		},
		[merge]
	);

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
};

export default useFormState;
