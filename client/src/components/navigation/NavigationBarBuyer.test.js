import React from "react";
import NavigationBarBuyer from "./NavigationBarBuyer";
import { Link } from "react-router-dom";
import { mount } from "enzyme";
import { BrowserRouter } from "react-router-dom";

const requiredURLs = ["/", "/orders", "/cart", "/map", "/profile"];

let sellerView = true;

const setSellerView = (value) => {
  sellerView = value;
};

describe("Navigation bar for Buyer", () => {
  const wrapper = mount(
    <BrowserRouter>
      <NavigationBarBuyer setSellerView={setSellerView} />
    </BrowserRouter>
  );

  const links = wrapper.find(Link);
  const linkURLs = links.map((link) => link.props().to);

  test("contains 5 links", () => {
    expect(links.length).toBe(5);
  });

  test("contains links to all required URLs", () => {
    requiredURLs.forEach((url) => {
      expect(linkURLs).toContain(url);
    });
  });

  test("clicking on homepage link sets sellerView to null", () => {
    const homepageLink = wrapper.find("#home").first();
    homepageLink.simulate("click");
    expect(sellerView).toBe(null);
  });
});
