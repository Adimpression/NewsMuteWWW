"use strict";
var Run = (function () {
    function Run() {
    }
    Run.prototype.handle = function (recordImpl) {
        console.log(recordImpl.Records);
        console.log(recordImpl.Records[0].eventID);
    };
    return Run;
}());
exports.Run = Run;
//# sourceMappingURL=run.js.map