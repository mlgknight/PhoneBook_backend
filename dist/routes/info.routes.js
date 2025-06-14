"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var contact_routes_1 = require("../routes/contact.routes");
var infoRouter = (0, express_1.Router)();
var now = new Date();
var dayName = now.toLocaleDateString('en-US', { weekday: 'long' });
var monthName = now.toLocaleDateString('en-US', { month: 'long' });
var date = now.getDate();
var year = now.getFullYear();
var hour24 = now.getHours();
var minute = now.getMinutes();
var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
var hour12 = hour24 % 12 || 12;
var ampm = hour24 >= 12 ? 'PM' : 'AM';
var currentTime = "".concat(dayName, "  ").concat(monthName, "  ").concat(date, "  ").concat(year, "  ").concat(hour12, ":").concat(minute.toString().padStart(2, '0'), " ").concat(ampm, "  (").concat(timeZone, ")");
infoRouter.get('/', function (req, res) {
    res.send("<p>Phonebook has info for ".concat(contact_routes_1.contacts.length, " people</p>\n        <p>").concat(currentTime, "</p>\n        "));
});
exports.default = infoRouter;
