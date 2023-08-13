import express from "express";
import Stripe from "stripe";

const router = express.Router();
const stripe = Stripe(process.env.STRIPE_KEY);

const YOUR_DOMAIN = process.env.CLIENT_URL;

router.post("/", async (req, res) => {
  const line_items = req.body.cartItems.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          images: [item.img],
          metadata: {
            id: item._id,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    success_url: YOUR_DOMAIN,
    cancel_url: YOUR_DOMAIN,
  });

  res.send({ url: session.url });
});

export default router;
