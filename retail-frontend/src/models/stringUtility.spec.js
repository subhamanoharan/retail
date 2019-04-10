import {replaceFrom, splitByLength} from './stringUtility';

describe('replaceFrom', () => {
  it('should replace from start index in the beginning', () => {
    const input = 'Hello World!';
    const replacement = '123';
    const start = 0;

    expect(replaceFrom(input, replacement, start)).toEqual('123lo World!');
  });

  it('should replace from start index in the middle', () => {
    const input = 'Hello I am here!';
    const replacement = '123';
    const start = 2;

    expect(replaceFrom(input, replacement, start)).toEqual('He123 I am here!');
  });

  it('should replace from start index in the end', () => {
    const input = 'Hello I am here!';
    const replacement = '123';
    const start = 6;

    expect(replaceFrom(input, replacement, start)).toEqual('Hello 123m here!');
  });
})

describe('splitByLength', () => {
  it('should split into equal parts', () => {
    const input = '123456789';
    const length = 3;

    expect(splitByLength(input, length)).toEqual(['123', '456', '789']);
  });

  it('should split into non equal parts with end padding', () => {
    const input = '12345678';
    const length = 3;

    expect(splitByLength(input, length)).toEqual(['123', '456', '78 ']);
  });
});
