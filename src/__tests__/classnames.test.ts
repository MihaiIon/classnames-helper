// ======================================================
// lib Tests File
// ======================================================

import cn from '..';

// Test
// ======================================================

test('No params', () => {
  expect(cn()).toBe('');
});

test('String param', () => {
  // Empty
  expect(cn('')).toBe('');
  expect(cn('', '')).toBe('');
  // Only a space
  expect(cn(' ')).toBe('');
  expect(cn(' ', ' ')).toBe('');
  expect(cn('   ', '    ')).toBe('');
  expect(cn('\t \r \n', '\t \r \n')).toBe('');
  // Default
  expect(cn('some-class')).toBe('some-class');
  expect(cn('some-class', 'some-class-2')).toBe('some-class some-class-2');
  // Mix
  expect(cn('some-class', '')).toBe('some-class');
  expect(cn('some-class', ' ')).toBe('some-class');
  expect(cn('', 'some-class-2')).toBe('some-class-2');
  expect(cn(' ', 'some-class-2')).toBe('some-class-2');
  // More
  expect(cn(' ', 'some-class-2', ' ', '', 'some-class-5')).toBe('some-class-2 some-class-5');
});

test('String trimming', () => {
  // Empty strings
  expect(cn('  ')).toBe('');
  expect(cn('  ', '  ')).toBe('');
  // Single class
  expect(cn(' some-class ')).toBe('some-class');
  expect(cn('  some-class  ')).toBe('some-class');
  // Multiple arguments
  expect(cn(' some-class ', ' some-class-2 ')).toBe('some-class some-class-2');
  expect(cn('  some-class  ', '  some-class-2  ')).toBe('some-class some-class-2');
  // Multiple classes
  expect(cn('c1 c2', 'c3 c4')).toBe('c1 c2 c3 c4');
  expect(cn(' c1 c2 ', ' c3 c4 ')).toBe('c1 c2 c3 c4');
  expect(cn('  c1 c2  ', '  c3 c4  ')).toBe('c1 c2 c3 c4');
  expect(cn('\n  c1 c2  \t', '\r  c3 c4  \t')).toBe('c1 c2 c3 c4');
  expect(cn('c1  c2', 'c3  c4')).toBe('c1 c2 c3 c4');
  expect(cn('c1   c2', 'c3   c4')).toBe('c1 c2 c3 c4');
  expect(cn('c1    c2', 'c3    c4')).toBe('c1 c2 c3 c4');
  expect(cn('c1\r\tc2', 'c3\n\tc4')).toBe('c1 c2 c3 c4');
});

test('Tuple (2): [boolean, string]', () => {
  // Empty
  expect(cn([true, ''])).toBe('');
  expect(cn([false, ''])).toBe('');
  expect(cn([true, ' '])).toBe('');
  expect(cn([false, ' '])).toBe('');
  expect(cn([true, '  '])).toBe('');
  expect(cn([false, '  '])).toBe('');
  // Default
  expect(cn([true, 'conditional-class'])).toBe('conditional-class');
  expect(cn([false, 'conditional-class'])).toBe('');
  // Trimming
  expect(cn([true, ' conditional-class '])).toBe('conditional-class');
  expect(cn([false, ' conditional-class '])).toBe('');
  expect(cn([true, '  conditional-class  '])).toBe('conditional-class');
  expect(cn([false, '  conditional-class  '])).toBe('');
  // Multiple strings (default)
  expect(cn([true, 'class-1 class-2'])).toBe('class-1 class-2');
  expect(cn([false, 'class-1 class-2'])).toBe('');
  // Multiple strings (trimming)
  expect(cn([true, ' class-1 class-2 '])).toBe('class-1 class-2');
  expect(cn([true, '  class-1 class-2  '])).toBe('class-1 class-2');
  expect(cn([true, 'class-1  class-2'])).toBe('class-1 class-2');
  expect(cn([true, 'class-1   class-2'])).toBe('class-1 class-2');
});

test('Tuple (3): [boolean, string, string]', () => {
  // Empty
  expect(cn([true, '', ''])).toBe('');
  expect(cn([false, '', ''])).toBe('');
  expect(cn([true, ' ', ' '])).toBe('');
  expect(cn([false, ' ', ' '])).toBe('');
  expect(cn([true, '  ', '  '])).toBe('');
  expect(cn([false, '  ', '  '])).toBe('');
  // Default
  expect(cn([true, 'if-true', 'if-false'])).toBe('if-true');
  expect(cn([false, 'if-true', 'if-false'])).toBe('if-false');
  // Trimming
  expect(cn([true, ' if-true ', ' if-false '])).toBe('if-true');
  expect(cn([false, ' if-true ', ' if-false '])).toBe('if-false');
  expect(cn([true, '  if-true  ', '  if-false  '])).toBe('if-true');
  expect(cn([false, '  if-true  ', '  if-false  '])).toBe('if-false');
  // Multiple strings (default)
  expect(cn([true, 'true-1 true-2', 'false-1 false-2'])).toBe('true-1 true-2');
  expect(cn([false, 'true-1 true-2', 'false-1 false-2'])).toBe('false-1 false-2');
  // Multiple strings (trimming)
  expect(cn([true, ' true-1 true-2 ', ' false-1 false-2 '])).toBe('true-1 true-2');
  expect(cn([true, '  true-1 true-2  ', '  false-1 false-2  '])).toBe('true-1 true-2');
  expect(cn([true, 'true-1  true-2', 'false-1  false-2'])).toBe('true-1 true-2');
  expect(cn([true, 'true-1   true-2', 'false-1   false-2'])).toBe('true-1 true-2');
});

test('Tuple (c): [() => number, ...string[]]', () => {
  // Empty
  expect(cn([0, '', '', ''])).toBe('');
  expect(cn([1, ' ', ' ', ' '])).toBe('');
  expect(cn([2, '  ', '  ', '  '])).toBe('');
  expect(cn([3, '  ', '  ', '  '])).toBe('');
  // Default
  expect(cn([0, 'class-1', 'class-2', 'class-3'])).toBe('class-1');
  expect(cn([1, 'class-1', 'class-2', 'class-3'])).toBe('class-2');
  expect(cn([2, 'class-1', 'class-2', 'class-3'])).toBe('class-3');
  expect(cn([3, 'class-1', 'class-2', 'class-3'])).toBe('');
  // Trimming
  expect(cn([0, ' class-1 ', ' class-2 ', ' class-3 '])).toBe('class-1');
  expect(cn([1, '  class-1  ', '  class-2  ', '  class-3  '])).toBe('class-2');
  // Multiple strings (default)
  expect(cn([0, 'c1 c2', 'c3 c4', 'c5 c6'])).toBe('c1 c2');
  expect(cn([1, 'c1 c2', 'c3 c4', 'c5 c6'])).toBe('c3 c4');
  expect(cn([2, 'c1 c2', 'c3 c4', 'c5 c6'])).toBe('c5 c6');
  expect(cn([-1, 'c1 c2', 'c3 c4', 'c5 c6'])).toBe('');
  // Multiple strings (trimming)
  expect(cn([0, ' c1 c2 ', ' c3 c4 ', ' c5 c6 '])).toBe('c1 c2');
  expect(cn([1, '  c1 c2  ', '  c3 c4  ', '  c5 c6  '])).toBe('c3 c4');
  expect(cn([1, 'c1  c2', 'c3  c4', 'c5  c6'])).toBe('c3 c4');
  expect(cn([2, 'c1   c2', 'c3   c4', 'c5   c6'])).toBe('c5 c6');
  expect(cn([10, 'c1   c2', 'c3   c4', 'c5   c6'])).toBe('');
});

test('Multi-Type arguments: string & boolean conditions', () => {
  // Single class
  expect(
    cn(
      'a',
      'b',
      [true, ' c '],
      [false, ' d '],
      [true, '  e  ', '  f  '],
      [false, '  g', 'h  '],
      'ij',
      [false, 'k', 'l'],
    ),
  ).toBe('a b c e h ij l');
  // Multi-class
  expect(
    cn(
      ' a b ',
      '  c d  ',
      [true, 'e  f'],
      [false, 'g  h'],
      [true, 'i   j', 'k   l'],
      [false, 'm    n', 'o    p'],
      'qr   s',
      [false, ' t u', 'v w '],
    ),
  ).toBe('a b c d e f i j o p qr s v w');
});

test('Multi-Type arguments: string & number conditions', () => {
  // Single class
  expect(
    cn(
      'a',
      ' b ',
      [0, '  c  ', '  d  ', '  e  '],
      [1, '  c  ', '  d  ', '  e  '],
      [2, '  c  ', '  d  ', '  e  '],
      [3, '  c  ', '  d  ', '  e  '],
      'f',
    ),
  ).toBe('a b c d e f');
  // Multi-class
  expect(
    cn(
      'a b',
      ' c d ',
      [0, '  e f  ', 'g  h', 'i   j'],
      [1, '  e f  ', 'g  h', 'i   j'],
      [2, '  e f  ', 'g  h', 'i   j'],
      [3, '  e f  ', 'g  h', 'i   j'],
      '  k   l  ',
    ),
  ).toBe('a b c d e f g h i j k l');
});

test('Multi-Type arguments: mixed', () => {
  expect(
    cn(
      'a',
      [true, 'b'],
      [false, 'c', 'd'],
      [true, 'e'],
      [false, 'f', 'g'],
      [0, 'h', 'i', 'j'],
      'k',
      [true, 'l', 'm'],
      [10, 'n', 'o', 'p'],
      [2, 'q', 'r', 's'],
      [false, 't'],
    ),
  ).toBe('a b d e g h k l s');
});
