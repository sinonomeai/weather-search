import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

const dbPath = path.join(process.cwd(), "api", "data", "db.json");

const readData = (): any => {
  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data);
};

const writeData = (data: any): void => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// 创建路由器，并挂载到 /api 路径下
const router = express.Router();

router.get("/users", (req, res) => {
  const db = readData();
  res.json(db.users);
});

router.get("/users/:id", (req, res) => {
  const db = readData();
  const user = db.users.find((u: any) => u.id === req.params.id);
  if (!user) return res.status(404).json({ message: "用户不存在" });
  res.json(user);
});

router.patch("/users/:id", (req, res) => {
  const db = readData();
  const userIndex = db.users.findIndex((u: any) => u.id === req.params.id);
  if (userIndex === -1) return res.status(404).json({ message: "用户不存在" });
  db.users[userIndex] = { ...db.users[userIndex], ...req.body };
  writeData(db);
  res.json(db.users[userIndex]);
});

// 挂载路由器
app.use("/api", router);

if (process.env.NODE_ENV !== "production") {
  app.listen(3000, () => console.log("🚀 Local server on port 3000"));
}

export default app;
