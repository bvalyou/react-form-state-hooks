import { ComponentType } from 'react';
import { ChangeEvent } from '../useFormState.types';

/**
 * @callback A component function
 * @param props - Standard React props
 * @param props.name - HTML input name - used to link to the context
 * @param props.onChange - HTML input change handler
 * @param [props.type] - HTML input type - used for checkbox/radio detection
 * @param [props.value] - HTML input value from the context
 * @param [props.checked] - HTML input checked attribute for checkbox/radio
 */
export interface InputProps extends Record<string, unknown> {
	name: string;
	onChange?: (event: ChangeEvent) => void;
	type?: string;
	value?: string;
	checked?: boolean;
}

export type InputComponent<T extends InputProps> = ComponentType<T>;
