/* eslint-disable no-undef */
module.exports = {
	"env": {
		"browser": true,
		"es2021": true,
		"commonjs": true,
		"jest": true
	},
	"extends": "eslint:recommended",
	"parserOptions": {
		"ecmaVersion": 12,
		"sourceType": "module"
	},
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"windows"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"always"
		],
		"object-curly-spacing": [
			"warn",
			"always"
		],
		"eqeqeq": "warn",
		"no-trailing-spaces": "warn",
		"no-console": 0
	}
};
