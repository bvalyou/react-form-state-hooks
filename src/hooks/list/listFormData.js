let unique = 0;

export const setUnique = (value) => {
	unique = value;
};

export const createIndexMapping = (name, list) =>
	list.reduce(
		(mapping, entry, index) => ({
			...mapping,
			[`${name}-${unique++}`]: index,
		}),
		{}
	);

export const updateIndexMapping = (name, indexMapping, list) => {
	const names = Object.entries(indexMapping);

	if (names.length === list.length) {
		return indexMapping;
	}

	const invertedMapping = names.reduce(
		(memo, [key, value]) => ({
			...memo,
			[value]: key,
		}),
		{}
	);

	return list.reduce(
		(memo, _, index) => ({
			...memo,
			[invertedMapping[index] || `${name}-${unique++}`]: index,
		}),
		{}
	);
};

export const compareEntries = (a, b) => (a[1] < b[1] ? -1 : 1);

export const mapData = (arrayData, indexMapping) =>
	Object.entries(indexMapping)
		.sort(compareEntries)
		.reduce(
			(objectData, [name, index]) => ({
				...objectData,
				[name]: arrayData[index],
			}),
			{}
		);

export const unmapData = (objectData, indexMapping) =>
	Object.entries(indexMapping)
		.sort(compareEntries)
		.reduce((arrayData, [name, index]) => {
			arrayData[index] = objectData[name]; // eslint-disable-line no-param-reassign
			return arrayData;
		}, []);

export const addFieldToIndexMapping = (name, indexMapping, index) => {
	const indices = Object.values(indexMapping);
	const maxIndex = indices.length ? Math.max(...indices) : -1;
	const newName = `${name}-${unique++}`;

	return [
		index || index === 0
			? Object.entries(indexMapping).reduce(
					(memo, [key, value]) => ({
						...memo,
						[key]: value < index ? value : value + 1,
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

export const removeFieldFromIndexMapping = (name, indexMapping) => {
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
