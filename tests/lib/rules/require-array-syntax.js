/**
 * @fileoverview Test of rule to enforce require() calls using array syntax
 * @author Ben Regenspan
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require("eslint"),
    ESLintTester = require("eslint-tester");

var eslintTester = new ESLintTester(eslint.linter);
eslintTester.addRuleTest("lib/rules/require-array-syntax", {

    valid: [
        "require(['modules/FrontPageApp'], function (FrontPage) {});"
    ],

    invalid: [{
        code: "require('modules/FrontPageApp', function (FrontPage) {});",
        errors: [{
            message: "require() call must specify an array as first argument.",
            type: "CallExpression"
        }]
    }]
});
