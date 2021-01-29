import type React from 'react';

/**
 * An object representation of a form's data - supports nesting and complex data types
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Data {}
export type UpdateData = (name: string, value: unknown) => void;
export type NestedUpdateData<T = Data> = (name: string, data: T) => void;
export type OnChange = (
	event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
) => void;

/**
 * Tools for rendering a form
 * @property {Data} data - The current managed data object
 * @property {UpdateData} updateData - Handles a change to a field in the data
 */
export interface FormState<T = Data> {
	data: T;
	updateData: UpdateData;
}

export enum FormStateActionType {
	Init,
	Update,
	Reset,
}

/**
 * An internal representation of the form state run managed by the reducer
 * @private
 */
export interface InternalFormState<T = Data> {
	data: T;
	cause: FormStateActionType;
}

/**
 * An internal action that provides the information needed to derive the next state from previous state
 * @private
 */
export interface FormStateAction<T = Data> {
	type: FormStateActionType;
	name?: string;
	value?: unknown;
	data?: T;
}

export type FormStateReducer<T = unknown> = React.Reducer<InternalFormState<T>, FormStateAction<T>>;

/**
 *
 */
export interface UseFormStateOptions<T = unknown> {
	initialData?: T;
	name?: string;
	updateData?: NestedUpdateData<T>;
	data?: T;
}
