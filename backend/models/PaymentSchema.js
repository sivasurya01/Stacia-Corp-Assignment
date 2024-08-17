const mongoose = require("mongoose");
const paymentschema = new mongoose.Schema({
  price: String,
  currency: String,
  creditCardNumber: Number,
  cvv: String,
  expirationMonth: Number,
  creditCardHolderName: String,
  customerFullName: String,
});

const paymentModel = mongoose.model("payments", paymentschema);
module.exports = paymentModel;
