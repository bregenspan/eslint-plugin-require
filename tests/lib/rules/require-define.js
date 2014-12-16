/**
 * @fileoverview Test of rule to ensure that file contents are enclosed by a define() statement
 * @author Ben Regenspan
 */

var eslint = require("eslint"),
    ESLintTester = require("eslint-tester");

var eslintTester = new ESLintTester(eslint.linter);
eslintTester.addRuleTest("lib/rules/require-define", {

    valid: [
        "define(['dependency1', 'dependency2'], function (dep1, dep2) { });",
        "'use strict'; define(['dependency1', 'dependency2'], function (dep1, dep2) { });"
    ],

    invalid: [{
        code: "function someFunction() {}",
        errors: [{
            message: "File contents should be wrapped in a define() call.",
            type: "Program"
        }]
    }, {
        code: "someFunctionCall();",
        errors: [{
            message: "File contents should be wrapped in a define() call.",
            type: "Program"
        }]
    }]
});
