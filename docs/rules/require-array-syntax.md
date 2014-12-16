# Rule to enforce `require()` calls using array syntax (require-array-syntax)

## Why use it?

`require()` has several different call signatures in RequireJS, a couple of which are quite similar in usage and easy to get confused by:

1. `require(['moduleName', ...], function cb(module) {}` - asynchronously load a module and pass it to `cb()`
2. `require('moduleName')` - immediately returns the specified module if it was already loaded; otherwise returns
3. `require('moduleName')` (inside a <a href="http://requirejs.org/docs/api.html#cjsmodule">Simplified CommonJS Wrapper</a>) - this behaves a lot like #1, but it's arguably a pretty strange attempt to make CommonJS work on the clientside, and CommonJS really wasn't made to work on the clientside. For our purposes here, let's ignore that this option exists.

It's especially easy to confuse #1 and #2 with eachother and the result can be brittle code that breaks unexpectedly and is then hard to trace as the source of the issue. Consider an unconventional wildlife park's inventory management app consisting of the files:

 * CretaceousPark.js
 * ContainmentPen.js
 * Albertosaurus.js

We start by making `CretaceousPark.js` responsible for a lot of the business logic of our app, adding a record representing our prize Albertosaurus and associating it with the containment pen it will be stored in:

```
...
require(['ContainmentPen', 'Albertosaurus'], function (ContainmentPen, Albertosaurus) {
    var al = new Albertosaurus();
    ContainmentPen.add(al);
});
...
```

And `ContainmentPen.js` includes the code:

```
...
require('Albertosaurus', function (Albertosaurus) {
    Pen.WEIGHT_BEARING_CAPACITY = Albertosaurus.MAX_WEIGHT * 5;
});
...
```

This code works fine, but one day we decide to limit the responsibilities of our top-level app, `CretaceousPark.js`, and move some of them out to `ContainmentPen`:

```
// CretaceousPark.js
...
require(['ContainmentPen'], function (ContainmentPen) {
    ContainmentPen.addDinos();
});
...
```
```
// ContainmentPen.js (same code as before)
...
require('Albertosaurus', function (Albertosaurus) {
    Pen.WEIGHT_BEARING_CAPACITY = Albertosaurus.MAX_WEIGHT * 5;
})
...
```

And all of a sudden, even though we changed nothing in ContainmentPen.js or its stated dependencies, `Pen.WEIGHT_BEARING_CAPACITY` is not getting set to a multiple of the maximum weight of the Albertosaurus, but we don't notice this right away because we haven't written any tests. The way we find out is that someone uses the inventory management app to order an insufficiently-strong containment pen and our prize Allosaurus escapes and wreaks havoc on the park and its visitors.

How did this happen? Well, we've done a lot of dumb things here, but the immediate issue at hand (the left hand; the other is deep inside a resurrected Late Cretaceous lizard) is that we used the `require('moduleName')` syntax, which made things appear as if we were specifying a dependency to load, when we were in fact pulling in that dependency only if it was already loaded. We had an implicit dependency and paid the price.

To ensure that our dependencies are explicitly stated in future and that something like this never happens again, next time we can use ESLint and the `require-array-syntax` rule.

(It is possible that this example came across as somewhat forced. It can be hard to make static analysis rules for JavaScript sound interesting.)

## Rule Details

This rule prohibits any use of `require()` besides those that load a an array containing one or more module identifiers (#1 above). This means that you *cannot* use the Simplified CommonJS wrapper style of loading, and also that you can't use the: `require('Albertosaurus')` syntax for synchronously calling an already-loaded module.

## When Not To Use It

If you want to use the <a href="http://requirejs.org/docs/api.html#cjsmodule">Simplified CommonJS Wrapper</a> format for your modules, you should not use this rule.
