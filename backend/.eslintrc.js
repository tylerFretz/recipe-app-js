/* eslint-disable no-undef */
module.exports = {
	'env': {
		'node': true,
		'es2021': true,
		'commonjs': true,
		'jest': true
	},
	'extends': 'eslint:recommended',
	'parserOptions': {
		'ecmaVersion': 12,
		'sourceType': 'module'
	},
	'rules': {
		'linebreak-style': [
			'warn',
			'windows'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		],
		'object-curly-spacing': [
			'warn',
			'always'
		],
		'eqeqeq': 'warn',
		'no-trailing-spaces': 'warn',
		'no-console': 0
	}
};
