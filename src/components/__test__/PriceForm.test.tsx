import { mount } from "enzyme";
import React from "react";
import PriceForm, { IProps } from "../PriceForm";

const props: IProps = {
  handleFormCancel: jest.fn(),
  handleFormSubmit: jest.fn(),
};
describe("测试PriceForm组件", () => {
  it("测试组件渲染", () => {
    const wrapper = mount(<PriceForm {...props} />);
    expect(wrapper.find("input").length).toEqual(3);
    expect(wrapper.find("form").length).toEqual(1);
    expect(wrapper.find(".submit-form").length).toEqual(1);
    expect(wrapper.find(".submit-cancle").length).toEqual(1);
    expect(wrapper.find("#date").instance().defaultValue).toEqual("");
    expect(wrapper.find("#title").instance().defaultValue).toEqual("");
    expect(wrapper.find("#price").instance().defaultValue).toEqual("");
  });
  it("测试提交空表单显示错误信息", () => {
    const wrapper = mount(<PriceForm {...props} />);
    wrapper.find("form").simulate("submit");
    expect(wrapper.state().validDataPass).toEqual(false);
    expect(wrapper.find(".message").length).toEqual(1);
    expect(props.handleFormSubmit).not.toHaveBeenCalled();
  });
  it("测试提交非法数据，价格为负数", () => {
    const wrapper = mount(<PriceForm {...props} />);
    wrapper.find("#title").instance().value = "test";
    wrapper.find("#price").instance().value = "-20";
    wrapper.find("#date").instance().value = "2021-02-23";
    wrapper.find("form").simulate("submit");
    expect(wrapper.state().validDataPass).toEqual(false);
  });
  it("测试提交非法数据，日期格式不正确", () => {
    const wrapper = mount(<PriceForm {...props} />);
    wrapper.find("#title").instance().value = "test";
    wrapper.find("#price").instance().value = "20";
    wrapper.find("#date").instance().value = "日期格式不合法";
    wrapper.find("form").simulate("submit");
    expect(wrapper.state().validDataPass).toEqual(false);
  });
  it("测试提交正确数据", () => {
    const wrapper = mount(<PriceForm {...props} />);
    wrapper.find("#title").instance().value = "test";
    wrapper.find("#price").instance().value = "20";
    wrapper.find("#date").instance().value = "2021-02-23";
    const newItem = { title: "test", price: "20", date: "2021-02-23" };
    wrapper.find("form").simulate("submit");
    expect(props.handleFormSubmit).toHaveBeenCalledWith(newItem, false);
  });
  it("测试点击关闭按钮", () => {
    const wrapper = mount(<PriceForm {...props} />);
    wrapper.find("button").last().simulate("click");
    expect(props.handleFormCancel).toHaveBeenCalled();
  });
});
