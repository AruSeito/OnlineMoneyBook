import React from "react";
import { mount, ReactWrapper } from "enzyme";
import PricesList, { IItem } from "../PricesList";
import { testItems, testCategories } from "../../testData";
import { flattenArr } from "../../utility";
import { MemoryRouter } from "react-router-dom";

const itemsWithCategory = testItems.map((item) => {
  const withCategory: IItem = {
    ...item,
    category: flattenArr(testCategories)[item.cid],
  };
  return withCategory;
});
const props = {
  items: itemsWithCategory,
  handleChangeItem: jest.fn(),
  handleDelItem: jest.fn(),
};
let wrapper: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
describe("测试PricesList组件", () => {
  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <PricesList {...props} />
      </MemoryRouter>
    );
  });
  it("渲染的组件与快照相匹配", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("测试渲染的数据条数", () => {
    expect(wrapper.find(".list-group-item").length).toEqual(
      itemsWithCategory.length
    );
  });
  it("测试渲染的icon", () => {
    const iconList = wrapper.find(".list-group-item").first().find("i");
    expect(iconList.length).toEqual(3);
    expect(iconList.first().props().className).toContain(
      props.items[0].category.iconName
    );
  });
  it("测试事件的回调", () => {
    const firstItem = wrapper.find(".list-group-item").first();
    firstItem.find("a").first().simulate("click");
    expect(props.handleChangeItem).toHaveBeenCalledWith(itemsWithCategory[0]);
    firstItem.find("a").last().simulate("click");
    expect(props.handleDelItem).toHaveBeenCalledWith(itemsWithCategory[0]);
  });
});
