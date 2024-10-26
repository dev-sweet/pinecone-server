const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT;
const stripe = require("stripe")(process.env.STRIPE_SECRET);

// middleweares
app.use(express.json());
app.use(cors());

// handle requests
app.get("/", (req, res) => {
  res.send("Hello world! Welcome to Pinecone Research Server.");
});

app.post("/create-payment-intent", async (req, res) => {
  const price = req.body.amount;
  const amount = parseInt(price * 100);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    payment_method_types: ["card"],
  });
  res.send({ clientSecret: paymentIntent.client_secret });
});
app.listen(port, () => {
  console.log(`Pinecone Research server started at PORT: ${port}`);
});
