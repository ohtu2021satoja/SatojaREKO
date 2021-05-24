import React from "react";
import "@testing-library/jest-dom/extend-expect";
import NavigationBarBuyer from "./NavigationBarBuyer";
import { Link } from "react-router-dom";
import { mount } from "enzyme";
import { BrowserRouter } from "react-router-dom";
import Enzyme from "enzyme";

import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new Adapter() });

let sellerView = false;

const setSellerView = (value) => {
  sellerView = value;
};

describe("Navigationbar for Buyer", () => {
  test("contains 5 links", () => {
    const wrapper = mount(
      <BrowserRouter>
        <NavigationBarBuyer setSellerView={setSellerView} />
      </BrowserRouter>
    );
    expect(wrapper.find(Link).length).toBe(5);
  });
});
