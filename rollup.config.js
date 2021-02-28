/* eslint-env node */
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import dts from 'rollup-plugin-dts';
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
		input: 'dist/src/index.d.ts',
		output: {
			file: 'index.d.ts',
			format: 'es',
		},
		plugins: [dts()],
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
		input: 'dist/src/controlled/index.d.ts',
		output: {
			file: 'controlled/index.d.ts',
			format: 'es',
		},
		plugins: [dts()],
	},
	{
		input: 'src/uncontrolled/index.ts',
		output: {
			file: 'uncontrolled/index.js',
			format: 'cjs',
		},
		plugins,
		external,
	},
	{
		input: 'dist/src/uncontrolled/index.d.ts',
		output: {
			file: 'uncontrolled/index.d.ts',
			format: 'es',
		},
		plugins: [dts()],
	},
];
