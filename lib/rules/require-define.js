/**
 * @fileoverview Rule to ensure that file contents are enclosed by a define() statement
 * @author Ben Regenspan
*/
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    /**
     * Check if the specified node is a literal expression (e.g. `"use strict;"`)
     * @param {ASTNode} node The node to check.
     * @returns {boolean} whether node is literal expression
     * @private
     */
    function isLiteralExpression(node) {
        return (node.type === "ExpressionStatement" && node.expression.type === "Literal");
    }

    /**
     * Check if the specified node is a call to define().
     * @param {ASTNode} node The node to check.
     * @returns {boolean} whether node is define call
     * @private
     */
    function isDefineCall(node) {
        if (node.type !== "ExpressionStatement" || node.expression.type !== "CallExpression") {
            return false;
        }
        return (node.expression.callee.name === "define");
    }

    return {
        "Program": function (node) {
            for (var i = 0, l = node.body.length; i < l; i++) {
                var childNode = node.body[i];
                if (!isLiteralExpression(childNode) && !isDefineCall(childNode)) {
                    context.report(node, "File contents should be wrapped in a define() call.");
                    break;
                }
            }
        }
    };

};
