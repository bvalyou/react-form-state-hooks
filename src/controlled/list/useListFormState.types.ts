import React from 'react';
import { IndexMapping, ListData, ListFormData } from '../../utils/listFormData.types';

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
	value?: T;
}

/**
 * @param name - The key in the parent state object where this list will go
 * @param updateData - A function to call when the data changes
 * @param initialData - The initial values the list contains
 * @param data - The current values the list contains - overrides internal state
 */
export interface UseListFormStateOptions<T = unknown> {
	name?: string;
	updateData?: UpdateListData;
	initialData?: ListData<T>;
	data?: ListData<T>;
}

export type UpdateListData<T = unknown> = (name: string, value: T) => void;
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
	data: ListData<T>;
	mappedData: ListFormData<T>;
	updateData: UpdateListData<T>;
	addEntry: AddEntry<T>;
	removeEntry: RemoveEntry;
}

export interface InternalListFormState<T> {
	name?: string;
	indexMap: IndexMapping;
	formData: ListFormData<T>;
	initialData?: ListData<T>;
	data?: ListData<T>;
	cause: ListActionType;
}

export interface ListFormStateAction<T = unknown> {
	type: ListActionType;
	name?: string;
	value?: T;
	index?: number;
	data?: ListData<T>;
}

export interface ListFormStateReducerInitOptions<T = unknown> {
	name?: string;
	initialData: ListData<T>;
	data?: ListData<T>;
}

export type ListFormStateReducer<T = unknown> = React.Reducer<
	InternalListFormState<T>,
	ListFormStateAction<T>
>;
