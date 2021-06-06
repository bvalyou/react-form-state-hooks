/* eslint-env node */
module.exports = {
	moduleNameMapper: {
		'react-form-state-hooks(.*)$': '<rootDir>/src/$1',
	},
	testPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/'],
};
