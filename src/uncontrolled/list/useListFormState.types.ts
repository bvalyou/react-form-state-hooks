import type React from 'react';
import type { IndexMapping, ListData, ListFormData } from '../../utils/listFormData.types';

export enum ListActionType {
	Init,
	Add,
	Remove,
	Reset,
}

export interface InternalListFormState<T = unknown> {
	indexMap: IndexMapping;
	initialFormData?: ListFormData<T>;
	cause: ListActionType;
	newName?: string;
	newValue?: T;
	removedName?: string;
}

export interface ListFormStateAction<T = unknown> {
	type: ListActionType;
	name?: string | undefined;
	index?: number;
	value?: T;
	data?: ListData<T>;
}

export type ListFormStateReducer<T = unknown> = React.Reducer<
	InternalListFormState<T>,
	ListFormStateAction<T>
>;

/**
 * @param name - The key in the parent state object where this list will go
 * @param updateData - A function to call when the data changes
 * @param initialData - The initial values the list contains
 * @param data - The current values the list contains - overrides internal state
 */
export interface UseListFormStateOptions<T = unknown> {
	name?: string;
	merge?: ListMerge;
	initialData?: ListData<T>;
}

/**
 * @property name - A generated name for the entry
 * @property key - A unique identifier for an iterator function
 * @property value - The current value held by this entry
 */
export interface Entry<T = unknown> {
	name: string;
	key: string;
	initialValue?: T;
}

export type AddEntry<T = unknown> = (value: T, index?: number) => void;
export type RemoveEntry = (name: string) => void;
export type GetListData<T = unknown> = () => { data: ListData<T>; formData: ListFormData<T> };
export type ResetList<T = unknown> = (data: ListData<T> | undefined) => ListData<T>;
export type ListMerge<T = unknown> = (data: ListFormData<T>) => ListFormData<T>;

/**
 * @property entries - Entries to render your form sections/fields
 * @property data - The current managed list values
 * @property updateData - Handles a change to a field in the data
 * @property addEntry - Adds a new entry to the list
 * @property removeEntry - Removes an entry from the list
 */
export interface ListFormState<T = unknown> {
	entries: Entry<T>[];
	addEntry: AddEntry<T>;
	removeEntry: RemoveEntry;
	getData: GetListData<T>;
	merge: ListMerge<T>;
	reset: ResetList<T>;
}
