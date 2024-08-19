const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
require("dotenv").config();

const port = 3000;
async function connection() {
  await mongoose
    .connect("mongodb://127.0.0.1:27017/staciacorpassignment")
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
