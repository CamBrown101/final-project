const express = require("express");
const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51I6MNvAlHHdCVPD0xFBPVZEUmUQ85OFmouTlrI8PEK2DRfeUFriLgPfAbG8sJhzb8etelk9afndbbsZylh1PZF6d00qUUub0UX"
);

const router = express.Router();

module.exports = (db) => {
  router.get("/secret", async (req, res) => {
    const intent = await stripe.paymentIntents.create({
      amount: 1099,
      currency: "cad",
    });
    res.json({ client_secret: intent.client_secret });
  });

  return router;
};
