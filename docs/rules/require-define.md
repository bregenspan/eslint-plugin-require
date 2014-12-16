# Rule to enforce all files being wrapped in a `define()` call (require-define)

## Why use it?

There are a number of ways of defining RequireJS-compatible modules, and one of the simplest and most common is to wrap a module with `define()` like so:

```
define(['dependency1', 'dependency2', 'dependency3'], function (Dependency1, Dependency2, Dependency3) {
    ...
}
```

For consistency reasons, it is arguably good to pick a format and settle on it -- all the contributors to your project will know the exact format to use. Also, some subtle bugs can occur if you forget and wrap a module in a `require()` call instead of a `define()` -- the module might look like it's working, but because what your file is doing is immediately invoking itself rather than defining a module, you might get unexpected behavior and race conditions that you don't detect until much later on in your development.

## Rule Details

This rule requires that the contents of every file are wrapped in a define() call, ensuring that your files match a strict subset of AMD.

## When Not To Use It

If you want to define your modules as UMD or CommonJS, this rule will not work for you.
