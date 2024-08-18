import React from "react";
import { render, screen } from "@testing-library/react";
import Products from "../Components/ProductCard"; // Adjust the import path accordingly
import { ProductsData } from "../Data/ProductData"; // Adjust the import path accordingly

jest.mock("../path_to/Data/ProductData", () => ({
  ProductsData: [
    {
      id: 1,
      productName: "Product 1",
      price: "$10",
      productImage: "image1.png",
    },
    {
      id: 2,
      productName: "Product 2",
      price: "$20",
      productImage: "image2.png",
    },
  ],
}));

describe("Products Component", () => {
  test("renders correctly and displays products", () => {
    render(<Products />);

    // Check for the page title
    expect(
      screen.getByRole("heading", { name: /Products/i })
    ).toBeInTheDocument();

    // Check if the products are rendered
    ProductsData.forEach((product) => {
      expect(screen.getByText(product.productName)).toBeInTheDocument();
      expect(screen.getByText(product.price)).toBeInTheDocument();
      // Optionally, you can test the presence of images using alt text or other selectors
    });
  });
});
