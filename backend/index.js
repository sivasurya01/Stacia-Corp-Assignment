const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const paypal = require("paypal-rest-sdk");
const braintree = require("braintree");
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const port = 3000;
function connection() {
  mongoose
    .connect("mongodb://localhost:27017/staciacorpassignment", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
}
app.get("/", (req, res) => {
  res.send("Hello Server is runing!");
});

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

const gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});
app.post("/api/pay", async (req, res) => {
  const { amount, currency, creditCard } = req.body;

  // Implement logic based on currency and card type
  if (
    currency === "USD" ||
    currency === "EUR" ||
    currency === "AUD" ||
    creditCard.type === "AMEX"
  ) {
    // Use PayPal
    paypal.payment.create(paymentDetails, function (error, payment) {
      if (error) {
        res.status(500).send(error.response);
      } else {
        res.status(200).send(payment);
      }
    });
  } else {
    // Use Braintree
    gateway.transaction.sale(
      {
        amount: amount,
        creditCard: creditCard,
      },
      function (err, result) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(result);
        }
      }
    );
  }
});

app.use("/payment", require("./controllers/PaymentControl"));
app.listen(port, () => {
  app.use((req, res, next) => {
    next(createError.NotFound());
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
      status: err.status || 500,
      message: err.message,
    });
  });
  connection();
  console.log("application runing");
});
