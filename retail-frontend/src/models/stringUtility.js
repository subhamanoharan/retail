import lodash from 'lodash';

export const replaceFrom = (input, replacement, start) =>
  input.substring(0, start) + replacement + input.substring(replacement.length + start);

export const splitByLength = (input, length) => {
  const inputArr = new Array(...input);
  return lodash.chunk(inputArr, length)
    .map((chunk) => chunk.join(''))
    .map(s => s.padEnd(length));
}

export const prettyPrintPrice = (i) => `${Number(i).toFixed(2)}`;

export const prettyPrintNumber = (i) =>
  Number.isInteger(i) ? `${i}` : `${Number(i).toFixed(2)}`;

export const prettyPrintWeight = (i) => {
  if(Number.isInteger(i)) return `${i} kg`;

  const kg = Math.floor(i);
  const g = i - kg;
  if(kg === 0) return `${g*1000} g`;

  return `${Number(i).toFixed(3)} kg`;
};
