import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProductsData } from "../Data/ProductData";
import axios from "axios";
function PaymentForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const product = ProductsData.find((data) => data.id == id);
  const currency = ["AUD", "SGD", "EUR", "USD", "THB", "HKD"];
  const [step, setStep] = useState(1);
  const [formdata, serFormData] = useState({
    price: product.price,
    customerfullName: "",
    creditCardHolderfullName: "",
    creditCardNumber: "",
    creditCardCCV: "",
    creditCardexpiration: "",
    Currency: "",
  });
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
          .post("https://stacia-corp-database-assignment.vercel.app/payment", {
            price: formdata.price,
            currency: formdata.Currency,
            creditCardNumber: formdata.creditCardNumber,
            cvv: formdata.creditCardCCV,
            expirationMonth: formdata.creditCardexpiration,
            creditCardHolderName: formdata.creditCardHolderfullName,
            customerFullName: formdata.customerfullName,
          })
          .then((res) => {
            console.log(res.data),
              toast.success("Payment Success"),
              setTimeout(() => {
                navigate("/");
              }, 2000);
          })
          .catch((e) => {
            console.log(e), toast.error(e.message);
          });
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
          <ol className="flex justify-between mb-4 sm:mb-5">
            <li className="flex w-[50%] items-center text-blue-600 bg-blue dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
                <svg
                  className="w-4 h-4 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 16"
                >
                  <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
                </svg>
              </div>
            </li>
            <li className="flex w-[50%] items-center after:content-['']  text-blue-600  dark:text-blue-500 after:inline-block dark:after:border-gray-700">
              <div
                className={`${
                  step == 2
                    ? "bg-blue-100 flex items-center justify-center w-10 h-10  rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0"
                    : "bg-gray-100 flex items-center justify-center w-10 h-10  rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0"
                }`}
              >
                <svg
                  className="w-4 h-4 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 14"
                >
                  <path d="M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM2 12V6h16v6H2Z" />
                  <path d="M6 8H4a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2Zm8 0H9a1 1 0 0 0 0 2h5a1 1 0 1 0 0-2Z" />
                </svg>
              </div>
            </li>
          </ol>
          {step == 1 && (
            <form onSubmit={() => setStep(2)}>
              <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white">
                Order Section
              </h3>
              <div className="grid gap-4 mb-4 sm:grid-cols-2">
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
                    required
                    onChange={(e) =>
                      serFormData({ ...formdata, Currency: e.target.value })
                    }
                    value={formdata.Currency}
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
                      serFormData({
                        ...formdata,
                        customerfullName: e.target.value,
                      })
                    }
                    value={formdata.customerfullName}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Next Step
                </button>
              </div>
            </form>
          )}
          {step == 2 && (
            <form onSubmit={handleSubmit}>
              <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white">
                Payment Section
              </h3>
              <div className="grid gap-4 mb-4 grid-cols-1 lg:grid-cols-2">
                <div>
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
                    value={formdata.creditCardHolderfullName}
                  />
                </div>
                <div>
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
                      serFormData({
                        ...formdata,
                        creditCardNumber: e.target.value,
                      })
                    }
                    name="creditCardNumber"
                    value={formdata.creditCardNumber}
                  />
                </div>
                <div>
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
                    value={formdata.creditCardexpiration}
                  />
                </div>
                <div>
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
                      serFormData({
                        ...formdata,
                        creditCardCCV: e.target.value,
                      })
                    }
                    name="cvv"
                    value={formdata.creditCardCCV}
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => setStep(1)}
                >
                  Prev
                </button>
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

export default PaymentForm;
