import React from "react";
import { render, screen } from "@testing-library/react";
import ProductInfo from "../components/productComponents/ProductInfo.jsx";

describe("ProductInfo component", () => {
  test("renders without crashing", () => {
    render(<ProductInfo />);
  });

  test("renders product name", () => {
    const productName = "Product A";
    render(<ProductInfo name={productName} />);
    const productNameElement = screen.getByText(productName);
    expect(productNameElement).toBeInTheDocument();
  });

  test("renders date of purchase", () => {
    const purchaseDate = "2022-04-29";
    render(<ProductInfo date_of_purchase={purchaseDate} />);
    const purchaseDateElement = screen.getByText(purchaseDate);
    expect(purchaseDateElement).toBeInTheDocument();
  });

  test("renders actual cost", () => {
    const actualCost = 100.5;
    render(<ProductInfo actual_cost={actualCost} />);
    const actualCostElement = screen.getByText(`Actual Cost:`);
    expect(actualCostElement).toBeInTheDocument();
  });

  test("renders selling cost", () => {
    const sellingCost = 150.75;
    render(<ProductInfo selling_cost={sellingCost} />);
    const sellingCostElement = screen.getByText(`Selling Cost:`);
    expect(sellingCostElement).toBeInTheDocument();
  });

  test("renders description", () => {
    const description = "This is a product description.";
    render(<ProductInfo description={description} />);
    const descriptionElement = screen.getByText(description);
    expect(descriptionElement).toBeInTheDocument();
  });
});

import SellerInfo from "../components/userComponents/SellerInfo.jsx";

describe("SellerInfo component", () => {
  test("renders without crashing", () => {
    render(<SellerInfo />);
  });

  test("renders seller name", () => {
    const sellerName = "John Doe";
    render(<SellerInfo username={sellerName} />);
    const sellerNameElement = screen.getByText(sellerName);
    expect(sellerNameElement).toBeInTheDocument();
  });

  test("renders email ID", () => {
    const email = "johndoe@example.com";
    render(<SellerInfo email={email} />);
    const emailElement = screen.getByText(email);
    expect(emailElement).toBeInTheDocument();
  });

  test("does not render contact info if not authorized", () => {
    const sellerName = "John Doe";
    const email = "johndoe@example.com";
    render(<SellerInfo username={sellerName} email={email} />);
    const contactElement = screen.queryByText("Contact No:");
    expect(contactElement).not.toBeInTheDocument();
  });

  test("renders contact info if authorized", () => {
    const sellerName = "John Doe";
    const email = "johndoe@example.com";
    const contact = "+1 1234567890";
    render(
      <SellerInfo username={sellerName} email={email} contact={contact} />
    );
    const contactElement = screen.getByText(contact);
    expect(contactElement).toBeInTheDocument();
  });
});
