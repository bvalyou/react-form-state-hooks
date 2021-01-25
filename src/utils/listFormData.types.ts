export interface IndexMapping {
	[key: string]: number;
}

export type ListData<T = unknown> = (T | undefined)[];

export interface ListFormData<T = unknown> {
	[key: string]: T | undefined;
}
