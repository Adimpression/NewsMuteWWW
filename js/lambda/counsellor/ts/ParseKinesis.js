///<reference path="DynamoDBItems.ts"/>
"use strict";
var Parse = (function () {
    function Parse() {
    }
    Parse.prototype.rootObject = function (rootObject) {
        return rootObject;
    };
    Parse.prototype.item = function (item) {
        return item;
    };
    return Parse;
}());
exports.Parse = Parse;
//# sourceMappingURL=ParseKinesis.js.map