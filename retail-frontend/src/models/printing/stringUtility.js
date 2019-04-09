import lodash from 'lodash';

export const replaceFrom = (input, replacement, start) =>
  input.substring(0, start) + replacement + input.substring(replacement.length + start);

export const splitByLength = (input, length) => {
  const inputArr = new Array(...input);
  return lodash.chunk(inputArr, length)
    .map((chunk) => chunk.join(''))
    .map(s => s.padEnd(length));
}
