// ======================================================
// Source File
// ======================================================

// Types
// ======================================================

type ConditionOrBoolFunction = boolean | (() => boolean);

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
  if (typeof str === 'string') {
    const _temp = trim(str);
    return _temp.length > 0 ? `${_temp} ` : '';
  }
  return '';
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
  ...args: (
    | string
    | [ConditionOrBoolFunction, string]
    | [ConditionOrBoolFunction, string, string]
    | [() => number, ...string[]]
  )[]
): string => {
  let _str: string = '';
  let _arr: [ConditionOrBoolFunction, ...string[]] | [() => number, ...string[]];

  for (const arg of args) {
    // Append classname
    if (typeof arg === 'string') {
      _str += formatString(arg as string);
      continue;
    }

    // Check for tuples
    else if (arg instanceof Array) {
      switch ((arg as any[]).length) {
        case 0:
        case 1:
          break;

        // Tuple (2): [ConditionOrBoolFunction, string]
        case 2:
          _arr = arg as [ConditionOrBoolFunction, string];
          if (typeof _arr[0] === 'boolean') {
            _str += _arr[0] ? formatString(_arr[1] as string) : '';
          } else if (typeof _arr[0] === 'function') {
            _str += _arr[0]() ? formatString(_arr[1] as string) : '';
          }
          break;

        // Tuple (3): [ConditionOrBoolFunction, string, string]
        case 3:
          _arr = arg as [ConditionOrBoolFunction, string, string];
          if (typeof _arr[0] === 'boolean') {
            _str += _arr[0] ? formatString(_arr[1] as string) : formatString(_arr[2] as string);
          } else if (typeof _arr[0] === 'function') {
            _str += _arr[0]() ? formatString(_arr[1] as string) : formatString(_arr[2] as string);
          }
          break;

        // Tuple (x): [() => number), ...string[]]
        default:
          _arr = arg as [() => number, ...string[]];
          if (typeof _arr[0] === 'function') {
            _str += formatString(getStringFromArray(_arr, _arr[0]()) as string);
          }
      }
    }
  }
  return _str.substring(0, _str.length - 1);
};
