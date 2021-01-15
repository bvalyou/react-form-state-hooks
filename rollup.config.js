/* eslint-env node */
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import pkg from './package.json';

const plugins = [
	typescript(),
	babel({ babelHelpers: 'bundled', extensions: ['.ts', '.js', '.tsx'] }),
	resolve(),
	commonjs(),
];
const external = Object.keys(pkg.peerDependencies).concat(Object.keys(pkg.dependencies));

export default [
	{
		input: 'src/index.ts',
		output: {
			file: 'index.js',
			format: 'cjs',
		},
		plugins,
		external,
	},
	{
		input: 'src/controlled/index.ts',
		output: {
			file: 'controlled/index.js',
			format: 'cjs',
		},
		plugins,
		external,
	},
	{
		input: 'src/controlled/context/index.ts',
		output: [
			{
				file: 'context.js',
				format: 'cjs',
			},
			{
				file: 'controlled/context.js',
				format: 'cjs',
			},
		],
		plugins,
		external,
	},
	{
		input: 'src/semiControlled/index.ts',
		output: {
			file: 'semiControlled/index.js',
			format: 'cjs',
		},
		plugins,
		external,
	},
	{
		input: 'src/semiControlled/context/index.ts',
		output: {
			file: 'semiControlled/context.js',
			format: 'cjs',
		},
		plugins,
		external,
	},
];
