/* eslint-env node */
module.exports = {
	env: {
		browser: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
	],
	plugins: ['prettier', 'react-hooks', '@typescript-eslint'],
	rules: {
		'prettier/prettier': 'warn',
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
		'@typescript-eslint/consistent-type-assertions': [
			'warn',
			{ assertionStyle: 'as', objectLiteralTypeAssertions: 'allow-as-parameter' },
		],
		'@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
		'@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports' }],

		'no-restricted-syntax': [
			'error',
			{
				selector:
					"CallExpression[arguments.length=1] > MemberExpression.callee > Identifier.property[name='reduce']",
				message: 'Provide initialValue to .reduce().',
			},
		],
		'no-mixed-spaces-and-tabs': 'off',
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
	overrides: [
		{
			files: ['*.spec.*'],
			env: {
				jest: true,
			},
		},
		{
			files: ['./stories/**/*.*'],
			rules: {
				// 'react/prop-types': 'off',
			},
		},
	],
};
