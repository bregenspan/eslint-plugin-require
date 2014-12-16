"use strict";

module.exports = {
    rules: {
        "require-define": require("./lib/rules/require-define"),
        "require-array-syntax": require("./lib/rules/require-array-syntax"),
        "require-module-prefix": require("./lib/rules/require-module-prefix")
    },
    rulesConfig: {
        "require-define": 2,
        "require-array-syntax": 2,
        "require-module-prefix": [2, "module/"]
    }
};
