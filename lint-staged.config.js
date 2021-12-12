module.exports = {
  '**/*.ts?(x)': () => 'tsc -p tsconfig.json --noEmit',
  '**/*.(ts|tsx|js|jsx)': ['eslint --cache --fix', 'prettier --write'],
  '**/*.(md|json)': 'prettier --write',
  '**/*.scss': ['stylelint --fix', 'prettier --write'],
};
