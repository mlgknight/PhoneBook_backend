"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactRouter = exports.contacts = void 0;
var express_1 = require("express");
var uuid_1 = require("uuid");
exports.contacts = [
    {
        id: '1',
        name: 'Arto Hellas',
        number: '040-123456',
    },
    {
        id: '2',
        name: 'Ada Lovelace',
        number: '39-44-5323523',
    },
    {
        id: '3',
        name: 'Dan Abramov',
        number: '12-43-234345',
    },
    {
        id: '4',
        name: 'Mary Poppendieck',
        number: '39-23-6423122',
    },
];
exports.contactRouter = (0, express_1.Router)();
exports.contactRouter.get('/', function (req, res) {
    console.log(exports.contacts);
    res.json(exports.contacts);
});
exports.contactRouter.post('/', function (req, res) {
    var userFound = exports.contacts.find(function (contact) { return contact.name == req.body.name; });
    if (!req.body.name) {
        return res.status(400).json({ error: 'Name data is required' });
    }
    else if (!req.body.number) {
        return res.status(400).json({ error: 'Number data is required' });
    }
    else if (userFound) {
        return res.status(400).json({
            error: "Cannot add user as ".concat(userFound.name, " is already in the database"),
        });
    }
    var newContact = __assign({ id: (0, uuid_1.v4)() }, req.body);
    exports.contacts.push(newContact);
    res.status(201).json(newContact);
});
exports.contactRouter.get('/:id', function (req, res) {
    var userId = req.params.id;
    var user = exports.contacts.find(function (contact) { return contact.id === userId; });
    if (user) {
        res.send(user);
    }
    else {
        res.status(404).json({ error: 'User not found' });
    }
});
exports.contactRouter.delete('/:id', function (req, res) {
    var userId = req.params.id;
    var initialLength = exports.contacts.length;
    exports.contacts = exports.contacts.filter(function (contact) { return contact.id !== userId; });
    if (exports.contacts.length < initialLength) {
        console.log(exports.contacts);
        res.status(204).end();
    }
    else {
        res.status(404).json({ error: 'User not found' });
    }
});
