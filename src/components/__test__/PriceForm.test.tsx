import { mount } from "enzyme";
import React from "react";
import PriceForm, { IProps } from "../PriceForm";

const props: IProps = {
  handleCancelSubmit: jest.fn(),
  handleFormSubmit: jest.fn(),
};
// const getInputValue = (selector, wrapper) =>
//   wrapper.find(selector).instance().value;
// const setInputValue = (selector, newValue, wrapper) => {
//   wrapper.find(selector).instance().value = newValue;
// };
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
});
