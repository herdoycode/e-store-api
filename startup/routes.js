import { error } from "../middlewares/error.js";
import users from "../routes/users.js";
import brands from "../routes/brands.js";
import messages from "../routes/messages.js";
import products from "../routes/products.js";
import stripe from "../routes/stripe.js";
import auth from "../routes/auth.js";

export const routes = (app) => {
  app.use("/api/users", users);
  app.use("/api/brands", brands);
  app.use("/api/products", products);
  app.use("/api/messages", messages);
  app.use("/api/auth", auth);
  app.use("/api/stripe", stripe);
  app.use(error);
};
