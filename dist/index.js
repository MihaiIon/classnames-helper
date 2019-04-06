"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

// ======================================================
// Source File
// ======================================================
// TypeCheck Helpers
// ======================================================
var isString = function isString(arg) {
  return typeof arg === "string" || arg instanceof String;
};

var isArray = function isArray(arg) {
  return arg instanceof Array || Array.isArray(arg);
};

var isBoolean = function isBoolean(arg) {
  return typeof arg === "boolean";
}; // Helpers
// ======================================================

/**
 * Returns the first element if the second element is "true", else "null".
 * @param {[String, Boolean], [String, String, Boolean]} array
 */


var arrayHelper = function arrayHelper(array) {
  switch (array.length) {
    case 2:
      return isString(array[0]) && isBoolean(array[1]) && array[1] ? array[0] : null;

    case 3:
      if (isString(array[0]) && isString(array[1]) && isBoolean(array[2])) return array[2] ? array[0] : array[1];

    default:
      return null;
  }
}; // Default export
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


function _default() {
  var args = Array.prototype.slice.call(arguments);
  return args.length > 0 ? args.map(function (arg) {
    if (isArray(arg)) return arrayHelper(arg);
    if (isString(arg) && arg.length > 0) return arg;
    return null;
  }).filter(function (el) {
    return el !== null;
  }).join(" ") : "";
}