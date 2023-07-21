import express from "express";
import { Brand, validate } from "../models/brand.js";
import { auth } from "../middlewares/auth.js";
import { admin } from "../middlewares/admin.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const categorys = await Brand.find();
  res.send(categorys);
});

router.get("/:id", async (req, res) => {
  const brand = await Brand.findById(req.params.id);
  if (!brand) return res.status(404).send("Category not found");
  res.send(brand);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const brand = new Brand({
    name: req.body.name,
  });
  await brand.save();
  res.send(brand);
});

router.put("/:id", [auth, admin], async (req, res) => {
  const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!brand) return res.status(404).send("Category not found");
  res.send(brand);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const brand = await Brand.findByIdAndRemove(req.params.id);
  if (!brand) return res.status(404).send("Category not found");
  res.send(brand);
});

export default router;
