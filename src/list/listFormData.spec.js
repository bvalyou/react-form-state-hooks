import * as listFormData from './listFormData';

describe('listFormData', () => {
	beforeEach(() => listFormData.setUnique(0));

	test('createIndexMapping', () => {
		const indexMapping = listFormData.createIndexMapping('foo', ['blah', 'blah', 'blah']);
		const foundNames = [];
		const foundIndices = [];
		Object.entries(indexMapping).forEach(([name, index]) => {
			expect(foundNames).not.toContain(name);
			foundNames.push(name);

			expect(foundIndices).not.toContain(index);
			foundIndices.push(index);
		});
	});

	describe('updateIndexMapping', () => {
		it('should return the original indexMapping if the list matches the original', () => {
			const indexMapping = {
				'foo--3': 0,
				'foo--2': 1,
				'foo--1': 2,
			};

			const actual = listFormData.updateIndexMapping('foo', indexMapping, [1, 2, 3]);

			expect(actual).toBe(indexMapping);
		});

		it('should add to the indexMapping if the list is longer than the indexMapping', () => {
			const indexMapping = {
				'foo--3': 0,
				'foo--2': 1,
				'foo--1': 2,
			};

			const actual = listFormData.updateIndexMapping('foo', indexMapping, [1, 2, 3, 4]);

			expect(actual).toEqual({
				...indexMapping,
				'foo-0': 3,
			});
		});

		it('should remove from the indexMapping if the list is shorter than the indexMapping', () => {
			const indexMapping = {
				'foo--3': 0,
				'foo--2': 1,
				'foo--1': 2,
			};

			const actual = listFormData.updateIndexMapping('foo', indexMapping, [1]);

			expect(actual).toEqual({ 'foo--3': 0 });
		});
	});

	test('compareEntries', () => {
		const testObject = { bar: 2, foo: 1, baz: 3 };

		expect(Object.entries(testObject).sort(listFormData.compareEntries)).toEqual([
			['foo', 1],
			['bar', 2],
			['baz', 3],
		]);
	});

	test('mapData', () => {
		expect(
			listFormData.mapData(['foo', 'bar', 'baz'], {
				'foo-0': 0,
				'foo-1': 1,
				'foo-2': 2,
			})
		).toEqual({ 'foo-0': 'foo', 'foo-1': 'bar', 'foo-2': 'baz' });
	});

	test('unmapData', () => {
		expect(
			listFormData.unmapData(
				{ 'foo-0': 'foo', 'foo-1': 'bar', 'foo-2': 'baz' },
				{ 'foo-0': 0, 'foo-1': 1, 'foo-2': 2 }
			)
		).toEqual(['foo', 'bar', 'baz']);
	});

	test('addFieldToIndexMapping', () => {
		const name = 'foo';
		const indexMapping = {
			'foo-1': 0,
			'foo-2': 1,
			'foo-3': 2,
			'foo-4': 3,
		};

		const [newIndexMapping, newName] = listFormData.addFieldToIndexMapping(name, indexMapping);

		expect(newIndexMapping).not.toBe(indexMapping);
		expect(newIndexMapping).toEqual({ ...indexMapping, [newName]: 4 });
	});

	test('addFieldToEmptyIndexMapping', () => {
		const name = 'foo';
		const indexMapping = {};

		const [newIndexMapping, newName] = listFormData.addFieldToIndexMapping(name, indexMapping);

		expect(newIndexMapping[newName]).toBe(0);
	});

	test('removeFieldFromIndexMapping', () => {
		const indexMapping = {
			'foo-1': 0,
			'foo-2': 1,
			'foo-3': 2,
			'foo-4': 3,
		};

		const newIndexMapping = listFormData.removeFieldFromIndexMapping('foo-3', indexMapping);

		expect(newIndexMapping).not.toBe(indexMapping);
		expect(newIndexMapping).toEqual({
			'foo-1': 0,
			'foo-2': 1,
			'foo-4': 2,
		});
	});
});
