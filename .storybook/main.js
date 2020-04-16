module.exports = {
	stories: ['../stories/**/*.stories.js'],
	addons: ['@storybook/addon-actions', '@storybook/addon-links'],
	webpackFinal: (config) => ({
		...config,
		resolve: {
			...config.resolve,
			alias: { 'react-form-state-hooks': '../src' },
		},
	}),
};
