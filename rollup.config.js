/* eslint-env node */
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

const plugins = [
	typescript(),
	babel({
		exclude: 'node_modules/**', // only transpile our source code
	}),
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
		input: 'src/context/index.ts',
		output: {
			file: 'context.js',
			format: 'cjs',
		},
		plugins,
		external,
	},
];
