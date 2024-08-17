const router = require("express").Router();
const paymentModel = require("../models/PaymentSchema");
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    await paymentModel
      .create(data)
      .then((user) => res.json(user))
      .catch((e) => res.json(e));
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
