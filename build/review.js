"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
let logout = (req, res) => {
    req.logout();
    res.redirect('/');
};
exports.logout = logout;
