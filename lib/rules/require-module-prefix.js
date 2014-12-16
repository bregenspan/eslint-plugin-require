/**
 * @fileoverview Rule to enforce require() calls only loading modules with a specified prefix
 * @author Ben Regenspan
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {

    "use strict";

    var modulePrefix = context.options[0];

    return {
        "CallExpression": function (node) {

            var moduleArray,
				item;

            if (node.callee.name !== "require" || !node.arguments.length) {
                return;
            }

            moduleArray = node.arguments[0];
            if (moduleArray.type !== "ArrayExpression") {
                return;
            }

            for (var i = 0, l = moduleArray.elements.length; i < l; i++) {

				item = moduleArray.elements[i];
				if (item.type !== "Literal") {
					continue;
				}

                if (moduleArray.elements[i].value.indexOf(modulePrefix) !== 0) {
                    context.report(node, "Module names in require() call must be prefixed with '{{modulePrefix}}'.", {
                        modulePrefix: modulePrefix
                    });
                }
            }
        }
    };

};
