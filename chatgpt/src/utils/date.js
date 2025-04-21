"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = void 0;
var date_fns_1 = require("date-fns");
var formatDate = function (date) {
    var today = new Date();
    var diffTime = today.getTime() - date.getTime();
    var diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) {
        return "Today";
    }
    else if (diffDays === 1) {
        return "Yesterday";
    }
    else if (diffDays < 7) {
        var weekday = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ];
        return weekday[(0, date_fns_1.getDay)(date)];
    }
    else {
        return (0, date_fns_1.format)(date, "MMM dd, yyyy");
    }
};
exports.formatDate = formatDate;
