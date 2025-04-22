"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setLocalStorage = exports.getFromLocalStorage = void 0;
var getFromLocalStorage = function (key, fallback) {
    try {
        var data = localStorage.getItem(key);
        return data ? JSON.parse(data) : fallback;
    }
    catch (_a) {
        return fallback;
    }
};
exports.getFromLocalStorage = getFromLocalStorage;
var setLocalStorage = function (item, chat) {
    item === "chatHistories"
        ? localStorage.setItem("chatHistories", JSON.stringify(chat))
        : localStorage.setItem("savedResponses", JSON.stringify(chat));
};
exports.setLocalStorage = setLocalStorage;
