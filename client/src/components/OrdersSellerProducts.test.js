import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import OrdersSellerProducts from "./OrdersSellerProducts"

describe("<Products> component", () => {
  test("renders text", () => {
    const component = render(<OrdersSellerProducts />);
    expect(component.container).toHaveTextContent("Tilaukset");
  });
});
