import React from "react";
import { mount, ReactWrapper } from "enzyme";
import MonthPicker from "../MonthPicker";

let props = {
  year: 2021,
  month: 2,
  changeDate: jest.fn(),
};

let wrapper: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

describe("测试MonthPicker组件", () => {
  beforeEach(() => {
    wrapper = mount(<MonthPicker {...props} />);
  });
  it("渲染的组件与快照相匹配", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("测试渲染年月与下拉菜单展开状态", () => {
    const text = wrapper.find(".dropdown-toggle").first().text();
    expect(text).toEqual("2021年02月");
    expect(wrapper.find(".dropdown-menu").length).toEqual(0);
    expect(wrapper.state("isOpen")).toEqual(false);
    expect(wrapper.state("selectedYear")).toEqual(props.year);
  });
  it("测试点击按钮后，下拉菜单中选中的为当年年月", () => {
    wrapper.find(".dropdown-toggle").simulate("click");
    expect(wrapper.state("isOpen")).toEqual(true);
    expect(wrapper.find(".dropdown-menu").length).toEqual(1);
    expect(wrapper.find(".years-range .dropdown-item").length).toEqual(9);
    expect(wrapper.find(".months-range .dropdown-item").length).toEqual(12);
    expect(wrapper.find(".years-range .dropdown-item.active").text()).toEqual(
      "2021年"
    );
    expect(wrapper.find(".months-range .dropdown-item.active").text()).toEqual(
      "02月"
    );
    expect(wrapper.find(".years-range .dropdown-item").first().text()).toEqual(
      `${props.year - 4}年`
    );
    expect(wrapper.find(".months-range .dropdown-item").first().text()).toEqual(
      "01月"
    );
  });
  it("选择年月后，正确显示", () => {
    wrapper.find(".dropdown-toggle").simulate("click");
    wrapper.find(".years-range .dropdown-item").first().simulate("click");
    expect(
      wrapper.find(".years-range .dropdown-item").first().hasClass("active")
    ).toEqual(true);
    expect(wrapper.state("selectedYear")).toEqual(2014);
    wrapper.find(".months-range .dropdown-item").first().simulate("click");
    expect(wrapper.state("isOpen")).toEqual(false);
    expect(props.changeDate).toHaveBeenCalledWith(2014, 1);
  });
});
