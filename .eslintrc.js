module.exports = {
	env: {
		browser: true,
	},
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
	},
	extends: ['eslint:recommended', 'plugin:react/recommended'],
	plugins: ['prettier', 'react-hooks'],
	rules: {
		'prettier/prettier': 'warn',
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',

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
			files: ['*.spec.js*'],
			env: {
				jest: true,
			},
		},
	],
};
