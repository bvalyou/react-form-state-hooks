import React from 'react';

export interface Data<T = unknown> {
	[name: string]: T;
}

export type GetData<T = unknown> = () => Data<T>;
export type Merge<T = unknown> = (data: Data<T>) => Data<T>;
export type Submit<T = unknown> = (data: Data<T>) => void;
export type Reset<T = unknown> = (data: Data<T>) => Data<T>;
type SupportedElements = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
export type ChangeEvent = React.ChangeEvent<SupportedElements>;

export interface UseFormStateOptions<T = unknown> {
	initialData?: Data<T>;
	merge?: Merge<T>;
	name?: string;
	submit?: Submit<T>;
}

export interface FormState<T = unknown> {
	getData: GetData<T>;
	merge: Merge<T>;
	reset: Reset<T>;
	onChange: (event: ChangeEvent) => void;
	onSubmit: (event: React.FormEvent) => void;
}
