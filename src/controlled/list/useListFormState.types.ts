import { IndexMapping } from '../../utils/listFormData.types';
import { Data, UpdateData } from '../useFormState.types';

export enum ListActionType {
	Init,
	Update,
	Add,
	Remove,
	Reset,
}

/**
 * @property name - A generated name for the entry
 * @property key - A unique identifier for an iterator function
 * @property value - The current value held by this entry
 */
export interface Entry<T = unknown> {
	name: string;
	key: string;
	value: T;
}

export type ListData<T = unknown> = T[];

/**
 * @param name - The key in the parent state object where this list will go
 * @param updateData - A function to call when the data changes
 * @param initialData - The initial values the list contains
 * @param data - The current values the list contains - overrides internal state
 */
export interface UseListFormStateOptions<T = unknown> {
	name?: string;
	updateData?: UpdateData;
	initialData?: ListData<T>;
	data?: ListData<T>;
}

export type AddEntry<T = unknown> = (value: T, index?: number) => void;
export type RemoveEntry = (name: string) => void;

/**
 * @property entries - Entries to render your form sections/fields
 * @property data - The current managed list values
 * @property mappedData - The internal object structure - works well for connecting a context built for formState
 * @property updateData - Handles a change to a field in the data
 * @property addEntry - Adds a new entry to the list
 * @property removeEntry - Removes an entry from the list
 */
export interface ListFormState<T = unknown> {
	entries: Entry<T>[];
	addEntry: AddEntry<T>;
	removeEntry: RemoveEntry;
	mappedData: Data<T>;
	data: ListData<T>;
	updateData: UpdateData<T>;
}

export interface InternalListFormState<T = unknown> {
	indexMap: IndexMapping;
	data: Data<T>;
	cause: ListActionType;
}

export interface ListFormStateAction<T = unknown> {
	type: ListActionType;
	name?: string;
	value?: T;
	index?: number;
	data?: ListData<T>;
}
