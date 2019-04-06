"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

// ======================================================
// Source File
// ======================================================
var is = require("is-type-of");
/**
 * Returns the first element if the second element is "true", else "null".
 * @param {[string, boolean]} array
 */


var arrayHelper = function arrayHelper(array) {
  if (array.length === 2 && isString(array[0])) return typeof array[1] === "boolean" && array[1] ? array[0] : null;
  if (array.length > 2 && isString(array[0]) && isString(array[1]) && typeof array[2] === "boolean") return array[2] ? array[0] : array[1];
  return null;
};
/**
 * Provides a string of classes based on the values of its arguments. This function
 * can take an unlimited number of arguments.
 *
 * Here is an example of a simple use case:
 *
 * // Import
 * import classNamesHelper from "path/to/classNamesHelper";
 *
 * // Usage
 * classNamesHelper(
 *   "c-component",
 *   "o-layout",
 *   ["-small", isSmall],
 *   ["-red", isRed],
 *   "-shrinked"
 * );
 *
 * @param {string | [string, boolean]} arguments
 */


function _default() {
  var args = Array.prototype.slice.call(arguments);
  return args.length > 0 ? args.map(function (arg) {
    if (arg instanceof Array) return arrayHelper(arg);
    if (isString(arg) && arg.length > 0) return arg;
    return null;
  }).filter(function (el) {
    return el !== null;
  }).join(" ") : "";
}