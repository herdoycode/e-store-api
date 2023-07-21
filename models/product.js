import mongoose from "mongoose";
import Joi from "joi";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      maxLength: 100,
      required: true,
    },
    description: {
      type: String,
      maxLength: 3000,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    img1: {
      type: String,
    },
    img2: {
      type: String,
      required: true,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },
    price: {
      type: Number,
      min: 5,
      max: 100000,
      require: true,
    },
    productType: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);

export const validate = (message) => {
  const schema = Joi.object({
    title: Joi.string().max(200).required(),
    description: Joi.string().max(300).required(),
    brandId: Joi.string().required(),
    img: Joi.string().required(),
    img1: Joi.string(),
    img2: Joi.string(),
    price: Joi.number().min(5).max(100000).required(),
    productType: Joi.string(),
  });
  return schema.validate(message);
};
