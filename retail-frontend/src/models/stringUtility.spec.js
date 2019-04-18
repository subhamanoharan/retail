import {replaceFrom, splitByLength,
  prettyPrintPrice, prettyPrintNumber, prettyPrintWeight, stripSpaces} from './stringUtility';

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

describe('prettyPrintPrice', () => {
  it('should return number as such for whole numbers', () =>
    expect(prettyPrintPrice(123)).toEqual('123.00')
  );

  it('should return number with 2 decimal places for decimals with 2 places', () =>
    expect(prettyPrintPrice(123.23)).toEqual('123.23')
  );

  it('should return number with 2 decimal places for decimals with less than 2 places', () =>
    expect(prettyPrintPrice(123.2)).toEqual('123.20')
  );

  it('should return number with 2 decimal places for decimals with more than 2 places', () =>
    expect(prettyPrintPrice(123.2123)).toEqual('123.21')
  );

  it('should return number with 2 decimal places for decimals with more than 2 places rounded', () =>
    expect(prettyPrintPrice(123.2163)).toEqual('123.22')
  );
});

describe('prettyPrintNumber', () => {
  it('should return number as such for whole numbers', () =>
    expect(prettyPrintNumber(123)).toEqual('123')
  );

  it('should return number with 2 decimal places for decimals with 2 places', () =>
    expect(prettyPrintNumber(123.23)).toEqual('123.23')
  );

  it('should return number with 2 decimal places for decimals with less than 2 places', () =>
    expect(prettyPrintNumber(123.2)).toEqual('123.20')
  );

  it('should return number with 2 decimal places for decimals with more than 2 places', () =>
    expect(prettyPrintNumber(123.2123)).toEqual('123.21')
  );

  it('should return number with 2 decimal places for decimals with more than 2 places rounded', () =>
    expect(prettyPrintNumber(123.2163)).toEqual('123.22')
  );
});

describe('prettyPrintWeight', () => {
  it('for whole number of kg', () =>
    expect(prettyPrintWeight(123)).toEqual('123 kg')
  );

  it('for whole number of g', () =>
    expect(prettyPrintWeight(0.01)).toEqual('10 g')
  );

  it('for kg and g with 2 decimals', () =>
    expect(prettyPrintWeight(123.25)).toEqual('123.250 kg')
  );

  it('for kg and g with 3 decimals', () =>
    expect(prettyPrintWeight(123.252)).toEqual('123.252 kg')
  );
});

describe('stripSpaces', () => {
  it('should remove spaces that exist', () => expect(stripSpaces(' H12 13')).toEqual('H1213'));
  it('should ignore if spaces dont exist', () => expect(stripSpaces('123abc')).toEqual('123abc'));
});
