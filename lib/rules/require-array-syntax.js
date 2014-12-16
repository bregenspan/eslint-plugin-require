/**
 * @fileoverview Rule to enforce require() calls using array syntax
 * @author Ben Regenspan
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {

    "use strict";

    return {
        "CallExpression": function (node) {

            var moduleArray;

            if (node.callee.name !== "require" || !node.arguments.length) {
                return;
            }

            moduleArray = node.arguments[0];
            if (moduleArray.type !== "ArrayExpression") {
                context.report(node, "require() call must specify an array as first argument.");
            }
        }
    };

};
