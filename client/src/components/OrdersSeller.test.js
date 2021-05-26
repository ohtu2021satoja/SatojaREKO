import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import OrdersSeller from "./OrdersSeller"

describe("<Products> component", () => {
  test("renders text", () => {
    const component = render(<OrdersSeller />);
    expect(component.container).toHaveTextContent("Tilaukset");
  });
});
