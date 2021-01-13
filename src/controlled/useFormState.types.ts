/**
 * An object representation of a form's data - supports nesting and complex data types
 */
export interface Data<T = unknown> {
	[name: string]: T;
}
export type UpdateData<T = unknown> = (name: string, value: T) => void;
export type NestedUpdateData<T = unknown> = (name: string, data: Data<T>) => void;

/**
 * Tools for rendering a form
 * @property {Data} data - The current managed data object
 * @property {UpdateData} updateData - Handles a change to a field in the data
 */
export interface FormState<T = unknown> {
	data: Data<T>;
	updateData: UpdateData<T>;
}

/**
 * An internal representation of the form state run managed by the reducer
 * @private
 */
export interface InternalFormState<T = unknown> {
	data: Data<T>;
	cause?: string;
}

/**
 * An internal action that provides the information needed to derive the next state from previous state
 * @private
 */
export interface FormStateAction<T = unknown> {
	type: string;
	name?: string;
	value?: T;
	data?: Data<T>;
}

/**
 *
 */
export interface UseFormStateOptions<T = unknown> {
	initialData?: Data<T>;
	name?: string;
	updateData?: NestedUpdateData<T>;
	data?: Data<T>;
}
