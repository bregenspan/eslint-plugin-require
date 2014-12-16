[![Build Status](https://travis-ci.org/bregenspan/eslint-plugin-require.svg)](https://travis-ci.org/bregenspan/eslint-plugin-require)

# eslint-plugin-require

<a href="http://eslint.org/">ESLint</a> rules for enforcing specified patterns of use of <a href="http://requirejs.org/">RequireJS</a> and compatible AMD module loaders.

## Why Use It

RequireJS provides great ways to manage, optimize, and asynchronously load dependencies, but it can be easy to make a few different types of mistakes when using it:

 * Calling `require('dependency-name', cb)` to load a dependency, when what you meant was `require(['dependency-name'], cb)`.
   * [require-array-syntax](docs/rules/require-array-syntax.md) can be used to mitigate this issue by enforcing that the first argument to `require()` is always an array.
 * Forgetting to wrap your module in a `define()` call or accidentally wrapping it in a `require()` call instead.
   * [require-define](docs/rules/require-define.md) enforces that all files be a strict subset of AMD that always starts with a `define()` statement.
 * Using inner `require()` statements for things you had intended to optimize into one file as part of your build.
   * [require-module-prefix](docs/rules/require-module-prefix.md) mitigates this issue by enforcing that `require()` statements reference files with a common prefix, e.g.: "modules/".  This supports a project structure wherein independently-loadable modules live in a "modules/" folder and can be optimized by the r.js loader to contain all their dependencies in one file, while still being dynamically loadable by other modules.

## Getting Started

Documentation for each rule can be found in [docs/rules](docs/rules).

## Further Reading

* http://eslint.org/ 
* http://requirejs.org/
