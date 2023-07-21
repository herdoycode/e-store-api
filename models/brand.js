import mongoose from "mongoose";
import Joi from "joi";

export const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: 200,
    required: true,
  },
});

export const validate = (brand) => {
  const schema = Joi.object({
    name: Joi.string().max(200).required(),
  });
  return schema.validate(brand);
};

export const Brand = mongoose.model("Brand", brandSchema);
