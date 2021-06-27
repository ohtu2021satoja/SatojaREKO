import { shallow /*, mount, render*/ } from "enzyme";
import ProfileHeaderSeller from "./ProfileHeaderSeller";

describe("Profile header", () => {
  const wrapper = shallow(<ProfileHeaderSeller />);

  test("should render without throwing an error", () => {
    expect(wrapper.contains(<h2 className="mb-4">Omat tiedot</h2>)).toBe(true);
  });
});
