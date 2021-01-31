module.exports = {
	extends: [require.resolve('@umijs/fabric/dist/eslint')],
	plugins: ['@typescript-eslint'],
	parser: './node_modules/@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.eslint.json',
		tsconfigRootDir: __dirname,
	},
	rules: {},
};
