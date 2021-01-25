import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Data {}

export type GetData<T = Data> = () => T;
export type Merge<T = Data> = (data: T | { [name: string]: T }) => T;
export type Submit<T = Data> = (data: T) => void;
export type Reset<T = Data> = (data: T) => T;
type SupportedElements = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
export type ChangeEvent = React.ChangeEvent<SupportedElements>;

export interface UseFormStateOptions<T = Data> {
	initialData?: T;
	merge?: Merge<T>;
	name?: string;
	submit?: Submit<T>;
}

export interface FormState<T = Data> {
	getData: GetData<T>;
	merge: Merge<T>;
	reset: Reset<T>;
	onChange: (event: ChangeEvent) => void;
	onSubmit: (event: React.FormEvent) => void;
}
