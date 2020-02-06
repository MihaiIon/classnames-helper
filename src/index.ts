// ======================================================
// Source File
// ======================================================

// Helpers
// ======================================================

/**
 * Removes all unnecessary spaces. Each word is separated by a space.
 * @param str
 */
const trim = (str: string): string => {
  return str
    .trim() // Remove unnecessary spaces
    .split(/\s|\v/) // Keep only words
    .filter((s: string) => s.length > 0) // Keep strings with length >= 1
    .join(' '); // Join with a space each word
};

/**
 * Format the given string `str` to remove all unnecessary spaces. A space ' '
 * will be added at the end each input.
 * @param str Raw input
 */
const formatString = (str: string): string => {
  const _temp = trim(str);
  return _temp.length > 0 ? `${_temp} ` : '';
};

/**
 * Provides the string located at `arr[index + 1]`. If the `index` is
 * out-of-bounce or the element `arr[index + 1]` isn't a string, this
 * function will provide an empty string.
 * @param arr
 * @param index
 */
const getStringFromArray = (arr: any[], index: number): string => {
  if (
    typeof index !== 'number' ||
    index < 0 ||
    index >= arr.length - 1 ||
    typeof arr[index + 1] !== 'string'
  ) {
    return '';
  }
  return arr[index + 1];
};

// Export
// ======================================================

/**
 * Joins classnames with optional conditions while removing unnecessary spaces.
 */
export default (
  ...args: (string | [boolean, string] | [boolean, string, string] | [number, ...string[]])[]
): string => {
  let _str: string = '';
  let _arr: [boolean, ...string[]] | [number, ...string[]];

  for (const arg of args) {
    // Append classname
    if (typeof arg === 'string') {
      _str += formatString(arg as string);
      continue;
    }

    // Check for tuples
    else if (arg instanceof Array) {
      switch ((arg as any[]).length) {
        // Tuple (2): [boolean, string]
        case 2:
          _arr = arg as [boolean, string];
          if (typeof _arr[0] === 'boolean' && typeof _arr[1] === 'string') {
            _str += _arr[0] ? formatString(_arr[1]) : '';
          }
          break;

        // Tuple (3): [boolean, string, string]
        case 3:
          _arr = arg as [boolean, string, string];
          if (
            typeof _arr[0] === 'boolean' &&
            typeof _arr[1] === 'string' &&
            typeof _arr[2] === 'string'
          ) {
            _str += _arr[0] ? formatString(_arr[1]) : formatString(_arr[2]);
          }
          break;

        // Tuple (x): [number), ...string[]]
        default:
          _arr = arg as [number, ...string[]];
          if (typeof _arr[0] === 'number') {
            _str += formatString(getStringFromArray(_arr, _arr[0]));
          }
      }
    }
  }
  return _str.substring(0, _str.length - 1);
};
