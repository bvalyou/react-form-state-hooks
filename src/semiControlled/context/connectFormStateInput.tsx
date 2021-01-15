import React, { useContext, useMemo } from 'react';
import createOnChange from '../createOnChange';
import { isListFormState } from '../useListFormState';
import type { InputComponent, InputProps } from './connectFormStateInput.types';
import FormStateContext from './FormStateContext';

/**
 * @module connectFormStateInput
 */

/**
 * Connects a form control to the FormStateContext
 * @param InputComponent - A React input or component matching the input API
 * @param [Context = FormStateContext] - A React context that will contain formState
 * @returns {function} The component with the InputComponent props applied
 * @alias module:connectFormStateInput
 */
function connectFormStateInput<P extends InputProps>(
	InputComponent: React.ComponentType<InputProps> | string,
	Context = FormStateContext
): InputComponent<P> {
	function ConnectedInput(props: P) {
		const formState = useContext(Context);
		const merge = formState?.merge;

		const onChange = useMemo(
			() => (merge ? createOnChange(merge, props.onChange) : props.onChange),
			[merge, props.onChange]
		);

		const data = isListFormState(formState) ? formState.getData().formData : formState?.getData?.();
		const defaultValue = data?.[props.name] || '';

		const stateProps = formState
			? props.type === 'checkbox' || props.type === 'radio'
				? {
						defaultChecked: Boolean(defaultValue),
				  }
				: { defaultValue }
			: {};

		return <InputComponent {...props} onChange={onChange} {...stateProps} />;
	}

	return ConnectedInput;
}

export default connectFormStateInput;
