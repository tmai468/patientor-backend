"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get("/ping", (req, res) => {
    console.log(`req is ${req}`);
    res.send("pong");
});
const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
