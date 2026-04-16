"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const dbPath = path_1.default.join(process.cwd(), "src", "data", "db.json");
const readData = () => {
    const data = fs_1.default.readFileSync(dbPath, "utf-8");
    return JSON.parse(data);
};
const writeData = (data) => {
    fs_1.default.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};
app.get("/users", (req, res) => {
    const db = readData();
    res.json(db.users);
});
app.get("/users/:id", (req, res) => {
    const db = readData();
    const user = db.users.find((u) => u.id === req.params.id);
    if (!user) {
        return res.status(404).json({ message: "用户不存在" });
    }
    res.json(user);
});
app.patch("/users/:id", (req, res) => {
    const db = readData();
    const userIndex = db.users.findIndex((u) => u.id === req.params.id);
    if (userIndex === -1) {
        return res.status(404).json({ message: "用户不存在" });
    }
    db.users[userIndex] = { ...db.users[userIndex], ...req.body };
    writeData(db);
    res.json(db.users[userIndex]);
});
exports.default = app;
