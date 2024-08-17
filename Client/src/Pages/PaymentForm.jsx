import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProductsData } from "../Data/ProductData";
import axios from "axios";
function PaymentForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id, "id");
  const product = ProductsData.find((data) => data.id == id);
  console.log(product, "product");
  const currency = ["AUD", "SGD", "EUR", "USD", "THB", "HKD"];
  const [formdata, serFormData] = useState({
    price: product.price,
    customerfullName: "",
    creditCardHolderfullName: "",
    creditCardNumber: "",
    creditCardCCV: "",
    creditCardexpiration: "",
    Currency: "",
  });
  console.log(formdata, "formdata");
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (
        !formdata.Currency ||
        !formdata.creditCardCCV ||
        !formdata.creditCardHolderfullName ||
        !formdata.creditCardNumber ||
        !formdata.creditCardexpiration ||
        !formdata.customerfullName ||
        !formdata.price
      ) {
        toast.error("Please Fill All Fields");
      } else {
        axios
          .post("http://localhost:3000/payment", {
            price: formdata.price,
            currency: formdata.Currency,
            creditCardNumber: formdata.creditCardNumber,
            cvv: formdata.creditCardCCV,
            expirationMonth: formdata.creditCardexpiration,
            creditCardHolderName: formdata.creditCardHolderfullName,
            customerFullName: formdata.customerfullName,
          })
          .then((res) => console.log(res.data))
          .catch((e) => console.log(e));
        toast.success("Payment Success");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      toast.error("Payment Failure");
    }
  };
  return (
    <div>
      <ToastContainer />
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
            Payment Form
          </h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label
                for="price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Price
              </label>
              <input
                type="text"
                id="price"
                name="price"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                required
                readOnly
                defaultValue={product.price}
              />
            </div>
            <div>
              <label
                for="subject"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Currency
              </label>
              <select
                name="currency"
                id="currency"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                // required
                onChange={(e) =>
                  serFormData({ ...formdata, Currency: e.target.value })
                }
              >
                <option value={""}>Choose Currency</option>
                {currency.map((cur, index) => {
                  return (
                    <option value={cur} key={index}>
                      {cur}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label
                for="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Customer Full Name{" "}
              </label>
              <input
                type="text"
                id="message"
                name="customerFullName"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required
                onChange={(e) =>
                  serFormData({ ...formdata, customerfullName: e.target.value })
                }
              />
            </div>
            <div className="sm:col-span-2">
              <label
                for="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Credit Card Holder Name{" "}
              </label>
              <input
                type="text"
                id="message"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                name="creditCardHolderName"
                required
                onChange={(e) =>
                  serFormData({
                    ...formdata,
                    creditCardHolderfullName: e.target.value,
                  })
                }
              />
            </div>
            <div className="sm:col-span-2">
              <label
                for="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Credit Card Number{" "}
              </label>
              <input
                type="text"
                id="message"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required
                onChange={(e) =>
                  serFormData({ ...formdata, creditCardNumber: e.target.value })
                }
                name="creditCardNumber"
              />
            </div>
            <div className="sm:col-span-2">
              <label
                for="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Credit Card Expiration{" "}
              </label>
              <input
                type="text"
                id="message"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required
                onChange={(e) =>
                  serFormData({
                    ...formdata,
                    creditCardexpiration: e.target.value,
                  })
                }
                name="expirationMonth"
              />
            </div>
            <div className="sm:col-span-2">
              <label
                for="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Credit Card CVV{" "}
              </label>
              <input
                type="text"
                id="message"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required
                onChange={(e) =>
                  serFormData({ ...formdata, creditCardCCV: e.target.value })
                }
                name="cvv"
              />
            </div>
            <button
              type="submit"
              className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-blue-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default PaymentForm;
