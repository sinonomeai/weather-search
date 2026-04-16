import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());

const dbPath = path.join(process.cwd(), "src", "data", "db.json");

const readData = (): any => {
  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data);
};

const writeData = (data: any): void => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// 移除类型注解，TypeScript 会自动推断
app.get("/users", (req, res) => {
  const db = readData();
  res.json(db.users);
});

app.get("/users/:id", (req, res) => {
  const db = readData();
  const user = db.users.find((u: any) => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ message: "用户不存在" });
  }
  res.json(user);
});

app.patch("/users/:id", (req, res) => {
  const db = readData();
  const userIndex = db.users.findIndex((u: any) => u.id === req.params.id);

  if (userIndex === -1) {
    return res.status(404).json({ message: "用户不存在" });
  }

  db.users[userIndex] = { ...db.users[userIndex], ...req.body };
  writeData(db);
  res.json(db.users[userIndex]);
});

if (process.env.NODE_ENV !== "production") {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}

export default app;
