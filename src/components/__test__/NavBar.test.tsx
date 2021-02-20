import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import NavBar, { IProps } from "../NavBar";

const props: IProps = {
  activeTab: "list",
  handleChangeTab: jest.fn(),
};

let wrapper: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
describe("测试NavBar", () => {
  beforeEach(() => {
    wrapper = shallow(<NavBar {...props} />);
  });
  it("渲染的组件与快照相匹配", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("测试切换tab", () => {
    const firstItem = wrapper.find(".nav-item").first();
    firstItem
      .find("a")
      .first()
      .simulate("click", { preventDefault: () => {} });
    expect(props.handleChangeTab).toHaveBeenCalledWith("list");
    expect(firstItem.find("a").first().props().className).toContain("active");
  });
});
