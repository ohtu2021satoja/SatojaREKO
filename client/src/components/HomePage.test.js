import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import HomePage from "./HomePage";

describe("<HomePage> component", () => {
  test("renders text", () => {
    const component = render(<HomePage />);
    expect(component.container).toHaveTextContent("Ostan lähiruokaa");
  });
});
