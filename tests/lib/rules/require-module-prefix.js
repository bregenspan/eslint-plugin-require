/**
 * @fileoverview Rule to enforce require() calls only loading modules with a specified prefix
 * @author Ben Regenspan
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require("eslint"),
    ESLintTester = require("eslint-tester");

var eslintTester = new ESLintTester(eslint.linter);
eslintTester.addRuleTest("lib/rules/require-module-prefix", {

    valid: [{
        code: "require(['modules/FrontPageApp', 'modules/PermalinkPageApp'], function (FrontPage, PermalinkPage) {});",
        args: [1, "modules/"]
    }, {
		// We do not attempt to guess the value of identifiers, so using any non-literal
		// value in the module array will always pass, for better or worse:
        code: "var moduleName = 'something'; require([moduleName], function (module) {});",
        args: [1, "modules/"]
	}],

    invalid: [{
        code: "require(['modules/FrontPageApp', 'lib/jquery'], function (FrontPage, $) {});",
        args: [1, "modules/"],
        errors: [{
            message: "Module names in require() call must be prefixed with 'modules/'.",
            type: "CallExpression"
        }]
    }]
});
