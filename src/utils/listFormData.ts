import type { Data } from '../controlled/useFormState.types';
import type { IndexMapping } from './listFormData.types';

let unique = 0;

export const setUnique = (value: number): void => {
	unique = value;
};

export const createIndexMapping = (name: string | undefined, list: unknown[]): IndexMapping =>
	<IndexMapping>list.reduce(
		(mapping, entry, index) => ({
			...(mapping as IndexMapping),
			[`${name}-${unique++}`]: index,
		}),
		{}
	);

export const updateIndexMapping = (
	name: string | undefined,
	indexMapping: IndexMapping,
	list: unknown[]
): IndexMapping => {
	const entries = Object.entries(indexMapping);

	if (entries.length === list.length) {
		return indexMapping;
	}

	const indexToName: { [key: number]: string } = entries.reduce(
		(memo, [key, value]) => ({
			...memo,
			[value]: key,
		}),
		{}
	);

	return <IndexMapping>list.reduce(
		(memo, _, index) => ({
			...(memo as IndexMapping),
			[indexToName[index] || `${name}-${unique++}`]: index,
		}),
		{}
	);
};

export const compareEntries = (a: [string, number], b: [string, number]): number =>
	a[1] < b[1] ? -1 : 1;

export const mapData = (arrayData: unknown[] = [], indexMapping: IndexMapping): Data =>
	Object.entries(indexMapping)
		.sort(compareEntries)
		.reduce(
			(objectData, [name, index]) => ({
				...objectData,
				[name]: arrayData[index],
			}),
			{}
		);

export const unmapData = (objectData: Data, indexMapping: IndexMapping): unknown[] =>
	Object.entries(indexMapping)
		.sort(compareEntries)
		.reduce((arrayData: unknown[], [name, index]) => {
			arrayData[index] = objectData[name]; // eslint-disable-line no-param-reassign
			return arrayData;
		}, []);

export const addFieldToIndexMapping = (
	name: string | undefined,
	indexMapping: IndexMapping,
	index?: number
): [IndexMapping, string] => {
	const indices = Object.values(indexMapping);
	const maxIndex = indices.length ? Math.max(...indices) : -1;
	const newName = `${name}-${unique++}`;

	return [
		index || index === 0
			? Object.entries(indexMapping).reduce(
					(memo, [key, mapIndex]) => ({
						...memo,
						[key]: mapIndex < index ? mapIndex : mapIndex + 1,
					}),
					{ [newName]: index }
			  )
			: {
					...indexMapping,
					[newName]: maxIndex + 1,
			  },
		newName,
	];
};

export const removeFieldFromIndexMapping = (
	name: string,
	indexMapping: IndexMapping
): IndexMapping => {
	const sortedEntries = Object.entries(indexMapping).sort(compareEntries);

	return sortedEntries
		.filter(([iterName]) => iterName !== name)
		.reduce(
			(entriesMemo, [iterName, index]) => ({
				...entriesMemo,
				[iterName]: index > indexMapping[name] ? index - 1 : index,
			}),
			{}
		);
};
