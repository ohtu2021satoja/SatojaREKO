import { shallow /*, mount, render*/ } from "enzyme";
import ProfilePageBuyer from "./ProfilePageBuyer";

describe("Buyer Profile", () => {
  const wrapper = shallow(<ProfilePageBuyer />);

  test("should render without throwing an error", () => {
    expect(wrapper.contains(<h3 className="mb-4">Omat tiedot</h3>)).toBe(true);
  });
});
