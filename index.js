// ======================================================
// Source File
// ======================================================

// TypeCheck Helpers
// ======================================================

const isString = arg => typeof arg === "string" || arg instanceof String;
const isArray = arg => arg instanceof Array || Array.isArray(arg);
const isBoolean = arg => typeof arg === "boolean";

// Helpers
// ======================================================

/**
 * Returns the first element if the second element is "true", else "null".
 * @param {[String, Boolean], [String, String, Boolean]} array
 */
const arrayHelper = array => {
  switch (array.length) {
    case 2:
      return isString(array[0]) && isBoolean(array[1]) && array[1]
        ? array[0]
        : null;
    case 3:
      if (isString(array[0]) && isString(array[1]) && isBoolean(array[2]))
        return array[2] ? array[0] : array[1];
    default:
      return null;
  }
};

// Default export
// ======================================================

/**
 * Provides a string of classenames by joining each argument (with conditionnal checks).
 * This function can take an unlimited number of arguments.
 *
 * Here is an example of a simple use case:
 *
 * // Import
 * import classNamesHelper from "classNamesHelper";
 *
 * // Usage
 * classNamesHelper(
 *   "c-component",
 *   "o-layout",
 *   ["-small", true],
 *   ["-red", false],
 *   ["-blue", "-green", true],
 *   ["-yellow", "-orange", false],
 *   "-shrinked"
 * );
 *
 * // Ouput: "c-component o-layout -small -blue -orange -shrinked"
 *
 * @param {String | [String, Boolean] | [String, String, Boolean]} arguments
 */
export default function() {
  const args = Array.prototype.slice.call(arguments);
  return args.length > 0
    ? args
        .map(arg => {
          if (isArray(arg)) return arrayHelper(arg);
          if (isString(arg) && arg.length > 0) return arg;
          return null;
        })
        .filter(el => el !== null)
        .join(" ")
    : "";
}
