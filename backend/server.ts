import { dbQuery } from "./database.js";
import express from "express";
import type { Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.listen(3000);

app.get("/products", async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await dbQuery("SELECT * FROM products", []);
    res.json(products.rows);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

app.get("/products/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const productId = req.params.id;
    const result = await dbQuery(
      "SELECT * FROM products WHERE product_id = $1",
      [productId]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});
