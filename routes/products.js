import express from "express";
import { Product, validate } from "../models/product.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find().populate("brand");
  res.send(products);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id).populate("brand");
  if (!product) return res.status(404).send("Product not found!");
  res.send(product);
  res.send(product);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.send(error.details[0].message);

  const { title, description, img, img1, img2, brandId, price, productType } =
    req.body;

  const product = new Product({
    title,
    description,
    img,
    img1,
    img2,
    brand: brandId,
    price,
    productType,
  });

  await product.save();
  res.send(product);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.send(error.details[0].message);

  const { title, description, img, img1, img2, brandId, price, productType } =
    req.body;

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      title,
      description,
      img,
      img1,
      img2,
      brand: brandId,
      price,
      productType,
    },
    { new: true }
  );
  if (!product) return res.status(404).send("Product not found!");
  res.send(product);
  res.send(product);
});

router.delete("/:id", async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id);
  if (!product) return res.status(404).send("Product not found!");
  res.send(product);
});

export default router;
