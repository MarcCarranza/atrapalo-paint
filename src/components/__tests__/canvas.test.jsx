import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from "enzyme";
import Canvas from "../Canvas/canvas";

describe("Canvas", () => {
  Enzyme.configure({ adapter: new Adapter()})
  it("renders correctly", () => {
    const wrapper = Enzyme.shallow(<Canvas />);
    expect(wrapper).toMatchSnapshot();
    // On the first run of this test, Jest will generate a snapshot file automatically.
  });
});
