/* eslint-env node */
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

const plugins = [
	babel({
		exclude: 'node_modules/**', // only transpile our source code
	}),
	resolve(),
	commonjs(),
];
const external = Object.keys(pkg.peerDependencies).concat(Object.keys(pkg.dependencies));

export default [
	{
		input: 'src/index.js',
		output: {
			file: 'index.js',
			format: 'cjs',
		},
		plugins,
		external,
	},
	{
		input: 'src/context/index.js',
		output: {
			file: 'context.js',
			format: 'cjs',
		},
		plugins,
		external,
	},
];
