import type { IndexMapping, ListData, ListFormData } from './listFormData.types';

let unique = 0;

export function setUnique(value: number): void {
	unique = value;
}

export function createIndexMapping(name: string | undefined, list: unknown[]): IndexMapping {
	return list.reduce<IndexMapping>(
		(mapping, entry, index) => ({
			...mapping,
			[`${name}-${unique++}`]: index,
		}),
		{}
	);
}

export function updateIndexMapping(
	name: string | undefined,
	indexMapping: IndexMapping,
	list: unknown[]
): IndexMapping {
	const entries = Object.entries(indexMapping);

	if (entries.length === list.length) {
		return indexMapping;
	}

	const indexToName = entries.reduce<{ [key: number]: string }>(
		(nextIndexToName, [key, value]) => ({
			...nextIndexToName,
			[value]: key,
		}),
		{}
	);

	return list.reduce<IndexMapping>(
		(nextIndexMapping, _, index) => ({
			...nextIndexMapping,
			[indexToName[index] || `${name}-${unique++}`]: index,
		}),
		{}
	);
}

export function compareEntries(a: [string, number], b: [string, number]): number {
	return a[1] < b[1] ? -1 : 1;
}

export function mapData<T = unknown>(
	arrayData: ListData<T> = [],
	indexMapping: IndexMapping
): ListFormData<T> {
	return Object.entries(indexMapping)
		.sort(compareEntries)
		.reduce(
			(objectData, [name, index]) => ({
				...objectData,
				[name]: arrayData[index],
			}),
			{}
		);
}

export function unmapData<T = unknown>(
	objectData: ListFormData<T>,
	indexMapping: IndexMapping
): ListData<T> {
	return Object.entries(indexMapping)
		.sort(compareEntries)
		.reduce<ListData<T>>((arrayData, [name, index]: [string, number]) => {
			arrayData[index] = objectData[name]; // eslint-disable-line no-param-reassign
			return arrayData;
		}, []);
}

export function addFieldToIndexMapping(
	name: string | undefined,
	indexMapping: IndexMapping,
	index?: number
): [IndexMapping, string] {
	const indices = Object.values(indexMapping);
	const maxIndex = indices.length ? Math.max(...indices) : -1;
	const newName = `${name}-${unique++}`;
	const newIndex = index || maxIndex + 1;

	return [
		Object.entries(indexMapping).reduce<IndexMapping>(
			(nextIndexMapping, [key, mapIndex]) => ({
				...nextIndexMapping,
				[key]: mapIndex < newIndex ? mapIndex : mapIndex + 1,
			}),
			{ [newName]: newIndex }
		),
		newName,
	];
}

export function removeFieldFromIndexMapping(
	name: string,
	indexMapping: IndexMapping
): IndexMapping {
	const removedIndex = indexMapping[name];

	return Object.entries(indexMapping)
		.sort(compareEntries)
		.filter(([key]) => key !== name)
		.reduce<IndexMapping>(
			(nextIndexMapping, [key, index]) => ({
				...nextIndexMapping,
				[key]: index > removedIndex ? index - 1 : index,
			}),
			{}
		);
}
