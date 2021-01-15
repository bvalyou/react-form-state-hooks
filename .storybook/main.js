const path = require('path');

module.exports = {
	stories: ['../stories/**/*.stories.ts'],
	addons: ['@storybook/addon-actions', '@storybook/addon-links'],
	webpackFinal: (config) => ({
		...config,
		module: {
			...config.module,
			rules: [
				{
					test: /\.tsx?$/,
					use: ['babel-loader', 'ts-loader'],
					exclude: /node_modules/,
				},
			],
		},
		resolve: {
			...config.resolve,
			extensions: ['.tsx', '.ts', '.js'],
			alias: {
				...config.resolve.alias,
				'react-form-state-hooks': path.resolve(__dirname, '../src'),
			},
		},
	}),
};
