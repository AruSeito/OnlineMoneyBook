import { shallow } from "enzyme";
import React from "react";
import CategorySelector, { category, IProps } from "../CategorySelector";

const categories: Array<category> = [
  {
    id: "1",
    name: "旅行",
    type: "outcome",
    iconName: "fa-plane",
  },
  {
    id: "2",
    name: "理财",
    type: "income",
    iconName: "fa-bank",
  },
  {
    id: "3",
    name: "贷款",
    type: "income",
    iconName: "fa-money",
  },
];

const props: IProps = {
  categories,
  handleSelectCategory: jest.fn(),
};

const props2: IProps = {
  categories,
  handleSelectCategory: jest.fn(),
  selectedCategory: categories[0],
};

describe("测试CategorySelector组件", () => {
  it("测试渲染正确的个数", () => {
    const wrapper = shallow(<CategorySelector {...props} />);
    expect(wrapper.find(".category-item").length).toEqual(categories.length);
    expect(wrapper.find(".category-item.active").length).toEqual(0);
    const firstIcon = wrapper.find(".category-item").first().find("i");
    expect(firstIcon.length).toEqual(1);
    expect(firstIcon.props().className).toContain(categories[0].iconName);
  });
  it("测试选中", () => {
    const wrapper = shallow(<CategorySelector {...props2} />);
    expect(
      wrapper
        .find(".category-item")
        .first()
        .find("button")
        .first()
        .hasClass("active")
    ).toEqual(true);
  });
  it("测试点击", () => {
    const wrapper = shallow(<CategorySelector {...props2} />);
    wrapper.find(".category-item .btn").at(1).simulate("click");
    expect(props2.handleSelectCategory).toHaveBeenCalledWith(categories[1]);
  });
});
