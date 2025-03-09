import express from "express";
import cors from "cors";
import { Request, Response } from "express";

const app = express();
app.use(express.json());
app.use(cors())
const port = 3000;

app.get("/:test", (req: Request, res: Response) => {
  const { test } = req.params;
  res.send({ test: test });
});

app.post("/:test", (req: Request, res: Response) => {
  const body = req.body;
  res.send(body);
});

app.listen(port, () => {
  console.log("server running");
});
