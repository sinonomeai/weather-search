// api/users.ts
import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ 修改这一行：从 src/data 改成 api/data
const dbPath = path.join(process.cwd(), "api", "data", "db.json");

const readData = (): any => {
  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data);
};

const writeData = (data: any): void => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

app.get("/users", (req, res) => {
  const db = readData();
  res.json(db.users);
});

app.get("/users/:id", (req, res) => {
  const db = readData();
  const user = db.users.find((u: any) => u.id === req.params.id);
  if (!user) return res.status(404).json({ message: "用户不存在" });
  res.json(user);
});

app.patch("/users/:id", (req, res) => {
  const db = readData();
  const userIndex = db.users.findIndex((u: any) => u.id === req.params.id);
  if (userIndex === -1) return res.status(404).json({ message: "用户不存在" });
  db.users[userIndex] = { ...db.users[userIndex], ...req.body };
  writeData(db);
  res.json(db.users[userIndex]);
});

// 本地开发用
if (process.env.NODE_ENV !== "production") {
  app.listen(3000, () => console.log("🚀 Local server on port 3000"));
}

// ✅ Vercel 部署必须导出
export default app;
