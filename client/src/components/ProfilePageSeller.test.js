import { shallow /*, mount, render*/ } from "enzyme";
import ProfilePageBuyer from "./ProfilePageBuyer";

describe("Seller Profile", () => {
  const wrapper = shallow(<ProfilePageBuyer />);

  test("should render without throwing an error", () => {
    expect(wrapper.contains(<h2 className="mb-4">Omat tiedot</h2>)).toBe(true);
  });
});
