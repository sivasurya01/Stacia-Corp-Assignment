const router = require("express").Router();
const paymentModel = require("../models/PaymentSchema");
const paypal = require("paypal-rest-sdk");
const braintree = require("braintree");
require("dotenv").config();

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

router.post("/", async (req, res) => {
  try {
    const {
      price,
      currency,
      creditCardNumber,
      customerFullName,
      creditCardHolderName,
      cvv,
    } = req.body;
    const paymentDetails = {
      intent: "sale",
      payer: {
        payment_method: "credit_card",
        funding_instruments: [
          {
            credit_card: {
              number: creditCardNumber,
              type: determineCardType(creditCardNumber),
              expire_month: "01",
              expire_year: "2025",
              cvv2: cvv,
              first_name: customerFullName,
              last_name: customerFullName,
              billing_address: {
                line1: "1234 Main St",
                city: "San Jose",
                state: "CA",
                postal_code: "95131",
                country_code: "US",
              },
            },
          },
        ],
      },
      transactions: [
        {
          amount: {
            total: price,
            currency: currency,
          },
          description: "Payment for order",
          payee: {
            email: "sb-zqpzm32089946@business.example.com", // Replace with actual payee's email
          },
        },
      ],
    };
    // Implement logic based on currency and card type
    if (
      currency === "USD" ||
      currency === "EUR" ||
      currency === "AUD" ||
      paymentDetails.payer.funding_instruments[0].credit_card.type === "AMEX"
    ) {
      // Use PayPal
      paypal.payment.create(paymentDetails, function (error, payment) {
        if (error) {
          res.status(500).send(error.response);
        } else {
          res.status(200).send(payment);
          storeDatabae({
            customerFullName: customerFullName,
            creditCardNumber: creditCardNumber,
            currency: currency,
            price: price,
          });
        }
      });
    } else {
      // Use Braintree
      gateway.transaction.sale(
        {
          amount: price,
          creditCard: {
            number: creditCardNumber,
            cardholderName: creditCardHolderName,
            expirationMonth: "5",
            expirationYear: "2030",
            cvv: cvv,
          },
        },
        function (err, result) {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(200).send(result);
            storeDatabae({
              customerFullName: customerFullName,
              creditCardNumber: creditCardNumber,
              currency: currency,
              price: price,
            });
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
});
function determineCardType(cardNumber) {
  const amexPattern = /^3[47][0-9]{13}$/;
  const visaPattern = /^4[0-9]{12}(?:[0-9]{3})?$/;
  const masterCardPattern = /^5[1-5][0-9]{14}$/;
  const discoverPattern = /^6(?:011|5[0-9]{2})[0-9]{12}$/;

  if (amexPattern.test(cardNumber)) {
    return "AMEX";
  } else if (visaPattern.test(cardNumber)) {
    return "VISA";
  } else if (masterCardPattern.test(cardNumber)) {
    return "MASTERCARD";
  } else if (discoverPattern.test(cardNumber)) {
    return "DISCOVER";
  } else {
    return "UNKNOWN";
  }
}
async function storeDatabae(data) {
  await paymentModel
    .create(data)
    .then((res) => console.log(res))
    .catch((e) => console.log(e));
}
module.exports = router;
