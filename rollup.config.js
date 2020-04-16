/* eslint-env node */
import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default {
	input: 'src/index.js',
	output: {
		file: 'index.js',
		format: 'cjs',
	},
	plugins: [
		resolve(),
		babel({
			exclude: 'node_modules/**', // only transpile our source code
		}),
	],
	external: Object.keys(pkg.peerDependencies).concat(Object.keys(pkg.dependencies)),
};
