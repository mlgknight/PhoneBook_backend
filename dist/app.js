"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var contact_routes_1 = require("./routes/contact.routes");
var info_routes_1 = __importDefault(require("./routes/info.routes"));
var morgan = require('morgan');
var app = express();
var hostname = 'localhost';
var PORT = process.env.PORT || 3001;
// middleware to parse JSON bodies
app.use(express.static('dist'));
app.use(express.json());
morgan.token('body', function (req) { return JSON.stringify(req.body); });
// Custom format: dev format + request body at the end
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use('/api/contacts', contact_routes_1.contactRouter);
app.use('/api/info', info_routes_1.default);
app.get('/', function (req, res) {
    res.send('New Contact API');
});
app.listen(PORT, hostname, function () {
    console.log("Server started on port ".concat(hostname, " ").concat(PORT));
});
exports.default = app;
