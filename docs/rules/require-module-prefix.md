# Rule to enforce `require()` calls loading files with the specified prefix (require-module-prefix)

## Why use it?

In a large project or multi-page app, you might exceed the amount of code that is optimal to deliver in a single optimized file (of the kind built by a simple RequireJS optimizer or Browserify setup). In such a case, you may want to split your code up into a number of modular components, each of which gets packaged separately. And you might want to load some of those components only on-demand, especially if they are only used by a small percentage of your users, to ensure that your base page loads fast.

As one example, if you're building a content site that will be read by many users but edited by only a few, and you use a very large rich text editor package (which is likely; there are few small ones), you might want to separate your code into the following top-level modules:

* `module/Main.js`
* `module/Editor.js`

Main.js consists of your main app code, which pulls in all your main dependencies, by including them in its top `define()` call. The only dependency it doesn't include right away is the one other module, `module/Editor`, which it instead loads on-demand like:

```
$('.compose-post').click(function () {
    require(['module/Editor'], function (Editor) {
        Editor.render();
    }
});
```

## Rule Details

This rule ensures that anything loaded in an inner `require()` statement starts with a certain prefix. The goal is to enforce a project structure in which you have a folder full of top-level modules (called e.g. "apps/" or "modules/"), and that these can be dynamically loaded inside inner `require()` statements by other modules. Files outside of the specified folder are not top-level modules, are not optimized by your build tool, and so you do not want to allow loading them individually on-demand; this rule blocks doing so.

## When Not To Use It

If you do not want to enforce a project structure in which require() calls can only be used to load modules from a specified folder, do not use this rule. On a small project, it is less likely that the performance benefits of this type of project structure outweigh the complexity added by structuring your project this way, so you might not want to use this type of structure or rule for a small project.
