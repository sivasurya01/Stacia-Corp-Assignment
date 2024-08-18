import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import PaymentForm from "../Pages/PaymentForm";

// Mock navigate function from react-router-dom
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("PaymentForm", () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={["/payment/1"]}>
        <Routes>
          <Route path="/payment/:id" element={<PaymentForm />} />
        </Routes>
      </MemoryRouter>
    );
  });

  test("renders PaymentForm component", () => {
    expect(screen.getByText(/Payment Form/i)).toBeInTheDocument();
  });

  test("renders the order section initially", () => {
    expect(screen.getByLabelText(/Price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Currency/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Customer Full Name/i)).toBeInTheDocument();
  });

  test("moves to payment section on clicking 'Next Step'", () => {
    fireEvent.change(screen.getByLabelText(/Currency/i), {
      target: { value: "USD" },
    });
    fireEvent.change(screen.getByLabelText(/Customer Full Name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.click(screen.getByText(/Next Step/i));

    expect(screen.getByText(/Credit Card Holder Name/i)).toBeInTheDocument();
  });

  test("shows error toast if form is not filled completely", () => {
    fireEvent.click(screen.getByText(/Submit/i));

    expect(screen.getByText(/Please Fill All Fields/i)).toBeInTheDocument();
  });

  test("submits the form successfully", async () => {
    // Fill in the form
    fireEvent.change(screen.getByLabelText(/Currency/i), {
      target: { value: "USD" },
    });
    fireEvent.change(screen.getByLabelText(/price/i), {
      target: { value: "500" },
    });
    fireEvent.change(screen.getByLabelText(/Customer Full Name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.click(screen.getByText(/Next Step/i));

    fireEvent.change(screen.getByLabelText(/Credit Card Holder Name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Credit Card Number/i), {
      target: { value: "4111111111111111" },
    });
    fireEvent.change(screen.getByLabelText(/Credit Card Expiration/i), {
      target: { value: "12/25" },
    });
    fireEvent.change(screen.getByLabelText(/Credit Card CVV/i), {
      target: { value: "123" },
    });

    fireEvent.click(screen.getByText(/Submit/i));

    // Check if payment was successful (mocked axios call would be ideal here)
    expect(await screen.findByText(/Payment Success/i)).toBeInTheDocument();
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
