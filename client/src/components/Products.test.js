import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Products from "./Products";

describe("<Products> component", () => {
  test("renders text", () => {
    const component = render(<Products />);
    expect(component.container).toHaveTextContent("Tuotteet");
  });
});
